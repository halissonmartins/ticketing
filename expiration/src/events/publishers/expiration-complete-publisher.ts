import { Subjects, Publisher, ExpirationCompleteEvent } from '@hrmd-lib/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}