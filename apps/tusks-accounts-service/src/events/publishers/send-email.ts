import { Publisher } from '@tusks/api/shared-services'
import { IEmailEvent, Subjects } from '@tusks/api/util-interfaces'

export class SendEmailPublisher extends Publisher<IEmailEvent> {
  subject: Subjects.Email = Subjects.Email
}
