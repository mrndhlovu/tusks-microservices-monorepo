import { Avatar, Input } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { IBoard } from '../../lib/providers';
import { UIDropdown } from '../shared';
import { IBoardMember } from './BoardHeader';
import BoardMemberCard from './BoardMemberCard';

interface IProps {
  members: IBoardMember[];
  board: IBoard;
  adminId: string;
}
const SearchBoardMember = ({ members, board, adminId }: IProps) => {
  const [searchOptions, setSearchOptions] = useState<IBoardMember[]>(members);

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    const result = members.filter(
      member => JSON.stringify(member).indexOf(ev.currentTarget.value) > -1,
    );

    if (result.length > 0) setSearchOptions(result);
  };

  return (
    <div>
      <Input onChange={handleSearch} placeholder="Search members" />

      <ul className="board-members-list">
        {searchOptions?.map?.((member, index) => (
          <li key={index}>
            <UIDropdown
              className="member-dropdown"
              contentClassName="board-member-content"
              toggle={
                <Avatar
                  name={
                    member?.firstName
                      ? `${member?.firstName} ${member?.lastName}`
                      : `${member?.initials}`
                  }
                  src={member?.profileImage?.[0]}
                  size="sm"
                />
              }>
              <BoardMemberCard
                member={member}
                board={board}
                adminId={adminId}
              />
            </UIDropdown>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBoardMember;
