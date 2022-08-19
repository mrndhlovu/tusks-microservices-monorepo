import { Publisher } from '@tusks/api/shared-services'
import { IAccountDeletedEvent, Subjects } from '@tusks/api/util-interfaces'

export class AccountDeletedPublisher extends Publisher<IAccountDeletedEvent> {
  subject: Subjects.AccountDeleted = Subjects.AccountDeleted
}
