import { Publisher, OrderCreatedEvent, Subjects } from "@avishaitickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}