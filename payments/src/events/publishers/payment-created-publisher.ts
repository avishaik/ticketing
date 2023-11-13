import { PaymentCreatedEvent, Publisher, Subjects } from "@avishaitickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}