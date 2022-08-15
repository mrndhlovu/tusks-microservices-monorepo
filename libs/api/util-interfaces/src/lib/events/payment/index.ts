import { INewPayment, Subjects } from '../../api-util-interfaces';

export interface IPaymentCreatedEvent {
  subject: Subjects.PaymentCreated;
  data: INewPayment;
}

export interface IPaymentFailedEvent {
  subject: Subjects.PaymentCreated;
  data: {
    productId?: string;
    customerId: string;
    ownerId: string;
    orderId: string;
  };
}
