import { Publisher, OrderCancelledEvent, Subjects } from "@avishaitickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}