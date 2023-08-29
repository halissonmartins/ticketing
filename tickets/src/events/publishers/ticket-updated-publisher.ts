import { Publisher, Subjects, TicketCreatedEvent, TicketUpdatedEvent } from "@hrmd-lib/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {

  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

}