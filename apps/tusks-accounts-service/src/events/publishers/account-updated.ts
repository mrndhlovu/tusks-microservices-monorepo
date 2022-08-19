import { Publisher } from '@tusks/api/shared-services'
import { IAccountUpdatedEvent, Subjects } from '@tusks/api/util-interfaces'

export class AccountUpdatedPublisher extends Publisher<IAccountUpdatedEvent> {
  subject: Subjects.AccountUpdated = Subjects.AccountUpdated
}
