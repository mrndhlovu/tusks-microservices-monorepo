import { Publisher } from '@tusks/api/shared-services';
import { IAddBoardMemberEvent, Subjects } from '@tusks/api/util-interfaces';

export class AddBoardMemberPublisher extends Publisher<IAddBoardMemberEvent> {
  subject: Subjects.AddBoardMember = Subjects.AddBoardMember;
}
