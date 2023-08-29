import mongoose from 'mongoose';
import { TicketUpdatedEvent } from '@hrmd-lib/common';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';

const setup = async () => {

  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 10,
  });

  await ticket.save();

  // Create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'new concert',
    price: 999,
    userId: 'fasdfasdfa'
  }

  // Create a fake message object
  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  }

  // Return all of this stuff
  return { message, data, ticket, listener };

}

it('finds, updates, and saves a ticket', async () => {

  const { message, data, ticket, listener } = await setup();

  await listener.onMessage(data, message);

  const udatedTicket = await Ticket.findById(ticket.id);

  expect(udatedTicket!.title).toEqual(data.title);
  expect(udatedTicket!.price).toEqual(data.price);
  expect(udatedTicket!.version).toEqual(data.version);

});

it('Acks the message', async () => {

  const { message, data, listener } = await setup();

  await listener.onMessage(data, message);

  expect(message.ack).toHaveBeenCalled();

});

it('does not call ack if the event has a skipped version number', async () => {

  const { message, data, ticket, listener } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, message);
  } catch (error) {

  }

  expect(message.ack).not.toHaveBeenCalled();

})

