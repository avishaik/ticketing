import { Publisher, Subjects, TicketCreatedEvent } from '@avishaitickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
