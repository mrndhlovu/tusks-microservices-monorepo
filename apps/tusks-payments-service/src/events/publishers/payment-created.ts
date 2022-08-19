import { Publisher } from '@tusks/api/shared-services';
import { IPaymentCreatedEvent, Subjects } from '@tusks/api/util-interfaces';

export class PaymentCreatedPublisher extends Publisher<IPaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
