import { Subjects } from '../../api-util-interfaces';

export interface IAddBoardMemberEvent {
  subject: Subjects.AddBoardMember;
  data: {
    memberId: string;
    boardInviteId: string;
  };
}
