import { ExpirationCompleteEvent, Publisher, Subjects } from "@avishaitickets/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;

    
}