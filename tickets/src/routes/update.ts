import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import {
  requireAuth, validateRequest, NotFoundError,
  NotAuthorizedError, BadRequestError
} from '@hrmd-lib/common';
import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be provided and greater than 0')
], validateRequest, async (req: Request, res: Response) => {

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError('Invalid ID');
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }

  if (ticket.orderId) {
    throw new BadRequestError('Cannot edit a reserved ticket');
  }

  if (ticket.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  const { title, price } = req.body;

  ticket.set({ title, price });

  await ticket.save();

  new TicketUpdatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    version: ticket.version,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId
  });

  res.send(ticket);
});

export { router as updateTicketRouter };