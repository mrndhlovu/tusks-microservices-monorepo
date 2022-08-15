import { Button } from '@chakra-ui/react';

import { apiClient } from '../../../api';
import { useAuth } from '../../../lib/providers';

const MfaStep4 = ({ recoveryData }) => {
  const { rehydrateUser } = useAuth();

  const handleSave = async () => {
    const update = { multiFactorAuth: true };
    await apiClient
      .handleUpdateUser(update)
      .then(res => rehydrateUser(res.data))
      .catch(err => {
        console.log('🚀 ~ file awaitsetUpMultiFactorAuth ~ err', err);
      });
  };

  return (
    <div>
      <p>1. Save this emergency recovery key</p>
      <p>
        If you lose access to your phone, you won't be able to log in to your
        account without this key. Print, copy or write down this key without
        letting anyone see it.
      </p>
      {recoveryData && (
        <div>
          <p>{recoveryData?.token}</p>
          <p>{recoveryData?.setupDate}</p>
        </div>
      )}

      <Button onClick={handleSave} colorScheme="blue">
        Saved, let's finish
      </Button>
    </div>
  );
};

export default MfaStep4;
