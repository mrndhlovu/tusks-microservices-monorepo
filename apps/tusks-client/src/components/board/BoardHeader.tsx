import { ChangeEvent, memo, MouseEvent, useRef, useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { AiOutlineEllipsis, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FiStar } from 'react-icons/fi';
import styled from 'styled-components';
import { IBoard, useAuth, useBoard } from '../../lib/providers';
import PowerUpButtons from './PowerUpButtons';
import InviteMemberModal from './InviteMemberModal';
import BoardMembers from './BoardMembers';

export interface IBoardMember {
  id: string;
  lastName: string;
  firstName: string;
  username: string;
  initials: string;
  profileImage: string[];
}

const Container = styled.div`
  ${props => props.theme.mixins.flex('row', 'space-between')};
  margin-bottom: 7px;
  padding: 3px 10px;
  width: 100%;

  [data-starred='true'] {
    color: ${props => props.theme.colors.amazon};
  }

  [data-starred='false'] {
    color: '#fff';
  }

  .board-member-content {
    padding: 0 !important;
  }

  .share-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: 0.6rem;
  }

  .dropdown {
    padding: 1rem;
    background-color: rgb(0 0 0 / 13%);
  }

  .board-header-right-icons,
  .board-header-left-icons {
    display: flex;
    gap: 3px;

    button.board-btn {
      border-radius: 3px;
      border: 0;
      text-decoration: none;
      align-items: center;
      background-color: rgb(0 0 0 / 13%);
      box-shadow: none;
      color: #ffffff;
      display: flex;
      font-weight: lighter;
      height: 32px;
      line-height: 32px;
      white-space: nowrap;
    }

    .board-members {
      position: relative;
      display: flex;

      li {
        list-style: none;
        width: 29px;
      }

      .board-member {
        padding: 0;
        background-color: transparent;
        border: none;
      }
    }

    .board-members-list {
      min-width: 270px;
      max-width: 270px;
      position: relative;
      display: flex;
      padding-top: 1rem;
      gap: 0.5rem;

      .member-dropdown {
        padding: 0;
      }

      button {
        display: inline-block;
        background-color: transparent;
      }
    }
  }
`;

const BoardHeader = () => {
  const {
    board,
    toggleDrawerMenu,
    setActiveBoard,
    saveBoardChanges,
    isStarred,
  } = useBoard();
  const { handleStarBoard, user } = useAuth();

  const [newBoardTitle, setNewBoardTitle] = useState<string>('');
  const [editing, setEditing] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);

  const handleEditTitle = () => {
    if (newBoardTitle && newBoardTitle !== board?.title) {
      const response = saveBoardChanges({ title: newBoardTitle });
      if (!response) return;
      setActiveBoard((prev: IBoard) => ({ ...prev, title: newBoardTitle }));
    }
    toggleEditTitle();
  };

  const handleChangeTitle = (ev: ChangeEvent<HTMLElement>) => {
    setNewBoardTitle((ev.target as any).value);
  };

  const handleShare = () => setShare(prev => !prev);

  const handleStarClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    handleStarBoard(ev.currentTarget?.id!);
  };

  const toggleEditTitle = () => setEditing(prev => !prev);

  return (
    <>
      <Container>
        <div className="board-header-left-icons">
          {!editing ? (
            <Button className="board-btn" onClick={toggleEditTitle}>
              {board?.title}
            </Button>
          ) : (
            <Input
              onChange={handleChangeTitle}
              onBlur={handleEditTitle}
              defaultValue={board?.title}
              size="sm"
            />
          )}

          <Button
            id={board?.id!}
            className="board-btn"
            size="sm"
            onClick={handleStarClick}>
            <FiStar
              data-starred={user?.starredBoards.includes(board?.id!)}
              className="star-icon"
            />
          </Button>
          <BoardMembers />
          <Button onClick={handleShare} className="board-btn share-btn">
            <AiOutlineUsergroupAdd size={18} />
            <span>Share</span>
          </Button>
        </div>

        <div className="board-header-right-icons">
          <PowerUpButtons />
          <Button
            size="sm"
            onClick={toggleDrawerMenu}
            className="board-btn"
            leftIcon={<AiOutlineEllipsis />}>
            Show menu
          </Button>
        </div>
      </Container>
      {share && (
        <InviteMemberModal
          boardId={board?.id!}
          isOpen={share}
          handleClose={handleShare}
        />
      )}
    </>
  );
};

export default memo(BoardHeader);
