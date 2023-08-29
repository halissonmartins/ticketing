import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NotFoundError, BadRequestError } from '@hrmd-lib/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError('Invalid ID');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };