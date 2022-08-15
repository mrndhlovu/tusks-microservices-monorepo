import { Avatar, Divider } from '@chakra-ui/react';
import Link from 'next/link';
import styled from 'styled-components';
import { IBoard } from '../../lib/providers';
import { IBoardMember } from './BoardHeader';

interface IProps {
  member: IBoardMember;
  board: IBoard;
  adminId: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;

  .slice {
    width: 100%;
    height: 70px;
    position: relative;
  }

  a {
    width: 100%;
    padding: 0.3rem;
    border-radius: 2px;
  }

  a:hover {
    background-color: ${props => props.theme.colors.borderLight};
  }

  .head {
    background-color: ${props => props.theme.colors.trello};
    display: flex;

    .card-avatar {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
    }

    & > div:first-child {
      width: 40%;
      position: relative;
    }
    & > div:last-child {
      width: 100%;
      position: relative;
      height: 100%;
    }

    .member-info {
      position: absolute;
      bottom: 0.7rem;
      color: #fff;
      font-size: 0.7rem;
    }

    .member-info p:first-child {
      font-weight: bold;
      text-transform: capitalize;
    }
  }

  .middle {
    padding: 1rem 1rem 0.5rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .footer {
    padding: 1rem 1rem 0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 90px;
  }
`;

const BoardMemberCard = ({ member, board, adminId }: IProps) => {
  return (
    <Container>
      <div className="head slice">
        <div>
          <Avatar
            className="card-avatar"
            src={member?.profileImage?.[0]}
            name={member.username}
            size="lg"
          />
        </div>
        <div>
          <div className="member-info">
            <p>{member.firstName}</p>
            <p>{`@${member.username}`}</p>
          </div>
        </div>
      </div>
      <div className="middle slice">
        <Link href={`/u/${member.id}/${board?.id!}`}>
          <a>View Profile</a>
        </Link>
      </div>
      <Divider />
      <div className="footer slice">
        <Link href={`/u/${member.id}/${board?.id!}`}>
          <a>View member's board activity</a>
        </Link>

        <Link href={`/u/${member.id}/${board?.id!}`}>
          <a>
            Change permission (
            {member.id === adminId ? <span>Admin</span> : <span>Normal</span>})
          </a>
        </Link>
      </div>
    </Container>
  );
};
export default BoardMemberCard;
