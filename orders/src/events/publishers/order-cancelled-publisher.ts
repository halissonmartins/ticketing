import { Publisher, OrderCancelledEvent, Subjects } from '@hrmd-lib/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}