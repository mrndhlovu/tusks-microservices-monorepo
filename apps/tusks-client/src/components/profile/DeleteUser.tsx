import { useState } from 'react';

import { Button } from '@chakra-ui/react';

import { apiClient, IPasswordConfirmation } from '../../api';
import { useAuth } from '../../lib/providers';
import PasswordConfirmation from '../auth/PasswordConfirmation';

const DeleteUser = () => {
  const { verifyUserPassword, rehydrateUser } = useAuth();

  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  const handleDelete = async (formData: IPasswordConfirmation) => {
    const response = await verifyUserPassword(formData);

    if (!response) return;

    apiClient
      .deleteUser()
      .then(() => rehydrateUser())
      .catch(err => {});
  };

  const handleOnClick = () => setShowPasswordConfirmation(prev => !prev);

  return (
    <div className="option-container delete-account">
      <p>Delete Account</p>
      <p>You will not be able to recover your account.</p>
      {showPasswordConfirmation ? (
        <PasswordConfirmation
          handleClick={handleDelete}
          buttonText="Yes delete my account"
        />
      ) : (
        <div>
          <Button size="sm" onClick={handleOnClick}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
