import { Publisher } from '@tusks/api/shared-services'
import { IAccountCreatedEvent, Subjects } from '@tusks/api/util-interfaces'

export class AccountCreatedPublisher extends Publisher<IAccountCreatedEvent> {
  subject: Subjects.AccountCreated = Subjects.AccountCreated
}
