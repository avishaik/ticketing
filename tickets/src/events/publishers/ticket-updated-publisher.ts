import { Publisher, Subjects, TicketUpdatedEvent } from '@avishaitickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
