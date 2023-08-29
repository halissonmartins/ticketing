import { Publisher, OrderCreatedEvent, Subjects } from '@hrmd-lib/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}