import { Message } from 'node-nats-streaming';
import Board from '../../models/Board';
import { boardService } from '../../services';
import Workspace from '../../models/Workspace';
import { Listener } from '@tusks/api/shared-services';
import {
  IAddBoardMemberEvent,
  queueGroupNames,
  ROLES,
  Subjects,
} from '@tusks/api/util-interfaces';

export class AddBoardMemberListener extends Listener<IAddBoardMemberEvent> {
  readonly subject: Subjects.AddBoardMember = Subjects.AddBoardMember;
  queueGroupName = queueGroupNames.BOARDS_QUEUE_GROUP;

  onMessage = async (data: IAddBoardMemberEvent['data'], msg: Message) => {
    console.log('Event data ', data);

    try {
      const board = await boardService.boardWithUpdatedMember({
        memberId: data.memberId,
        role: ROLES.EDITOR,
        boardId: data.boardInviteId,
      });

      const workspace = await Workspace.findOne({
        owner: data.memberId,
        category: 'default',
      });

      if (workspace) {
        workspace.boards.push(data.boardInviteId);
        await workspace.save();
      }

      if (board) {
        await board.save();
      }

      msg.ack();
    } catch (error) {
      return error;
    }
  };
}
