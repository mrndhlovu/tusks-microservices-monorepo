import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { apiClient } from '../../api';

const Container = styled.form`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;

  button {
    background: ${props => props.theme.colors.trello};
    color: #fff;

    &:hover {
      background: ${props => props.theme.colors.trello};
      opacity: 0.9;
    }
  }
`;

const Content = styled(ModalBody)`
  min-width: 500px;
`;

interface IProps {
  boardId: string;
  isOpen: boolean;
  handleClose: () => void;
}

const MEMBER_OPTIONS = [
  { label: 'Member', value: 'member' },
  { label: 'Observer', value: 'observer' },
  { label: 'Admin', value: 'admin' },
];

const InviteMemberModal = ({ boardId, isOpen, handleClose }: IProps) => {
  const [identifier, setIdentifier] = useState<string>('');
  const [inviteSent, setInviteSent] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string | undefined>();

  const handleInvite = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await apiClient.inviteToBoard(identifier, boardId);

    if (response.status === 204) {
      setIdentifier('');
      setInviteSent(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.currentTarget.value);
  };

  const selectRole = (ev: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(ev?.currentTarget?.value);
  };

  return (
    <Modal onClose={handleClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share</ModalHeader>
        <Content>
          <Container id="invite-form" onSubmit={handleInvite}>
            <Input
              value={identifier}
              name="identifier"
              onChange={handleChange}
              placeholder="Email address or username"
            />

            <Select onChange={selectRole}>
              {MEMBER_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>

            <Button disabled={inviteSent} type="submit">
              {inviteSent ? 'Invite Sent' : 'Send Invite'}
            </Button>
          </Container>
        </Content>
      </ModalContent>
    </Modal>
  );
};

export default InviteMemberModal;
