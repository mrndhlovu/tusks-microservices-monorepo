import { Publisher } from '@tusks/api/shared-services';
import { ICustomerCreated, Subjects } from '@tusks/api/util-interfaces';

export class CustomerCreatedPublisher extends Publisher<ICustomerCreated> {
  subject: Subjects.CustomerCreated = Subjects.CustomerCreated;
}
