import { Avatar, AvatarBadge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { apiClient } from '../../api';
import { useAuth, useBoard } from '../../lib/providers';
import { UIDropdown } from '../shared';
import { IBoardMember } from './BoardHeader';
import BoardMemberCard from './BoardMemberCard';
import SearchBoardMember from './SearchBoardMember';

const BoardMembers = () => {
  const { board } = useBoard();
  const { user } = useAuth();
  const [members, setMembers] = useState<IBoardMember[]>();
  const first4Members = members?.slice(0, 4);
  const restMembers = members?.slice(4, members.length);

  useEffect(() => {
    if (!board) return;
    const getBoardMembers = async () => {
      const memberIds = board?.members?.join('-');

      const response = await apiClient.getBoardMembers(memberIds);

      if (response?.status === 200) {
        setMembers(response?.data);
      }
    };

    getBoardMembers();
  }, [board?.members]);

  return (
    <ul className="board-members">
      {first4Members?.map?.((member, index) => (
        <li key={index}>
          <UIDropdown
            className="board-btn board-member"
            contentClassName="board-member-content"
            toggle={
              <Avatar
                name={
                  member?.firstName
                    ? `${member?.firstName} ${member?.lastName}`
                    : `${member?.initials}`
                }
                src={member?.profileImage?.[0]}
                size="sm">
                {board?.owner! === member.id && (
                  <AvatarBadge boxSize="1em" bg="green.500" />
                )}
              </Avatar>
            }>
            <BoardMemberCard
              board={board!}
              member={member}
              adminId={board?.owner}
            />
          </UIDropdown>
        </li>
      ))}

      {restMembers?.length! > 0 && (
        <li>
          <UIDropdown
            heading="Board members"
            className="board-btn board-member"
            toggle={<Avatar name={`+ ${restMembers?.length}`} size="sm" />}>
            <SearchBoardMember
              members={members!}
              board={board!}
              adminId={board?.owner}
            />
          </UIDropdown>
        </li>
      )}
    </ul>
  );
};
export default BoardMembers;
