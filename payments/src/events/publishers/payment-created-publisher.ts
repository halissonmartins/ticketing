import { Subjects, Publisher, PaymentCreatedEvent } from "@hrmd-lib/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}