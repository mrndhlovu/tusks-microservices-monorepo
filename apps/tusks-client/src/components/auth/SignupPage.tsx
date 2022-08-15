import { useRef } from 'react';

import { FORM_VALIDATION } from '../../util/formhelpers';
import { ROUTES } from '../../util/constants';
import { UIFormInput } from '../shared';
import { useAuth } from '../../lib/providers';
import AuthFormWrapper from './AuthFormWrapper';
import { Button } from '@chakra-ui/react';
import FormLink from './FormLink';

const initialState = {
  username: '',
  email: '',
  password: '',
};

interface IProps {
  boardInviteId?: string;
}

const SignupPage = ({ boardInviteId }: IProps) => {
  const { signup } = useAuth();
  const formRef = useRef<any>();

  const handleSubmit = async (ev: MouseEvent) => {
    ev.preventDefault();
    signup({ ...formRef.current.values, boardInviteId });
  };

  return (
    <AuthFormWrapper
      formId="signup-form"
      heading="Signup for an account"
      initialState={initialState}
      ref={formRef}
      validationSchema={FORM_VALIDATION.REGISTER}>
      <UIFormInput required placeholder="Username" name="username" />
      <UIFormInput required placeholder="Email" name="email" />
      <UIFormInput
        type="password"
        required
        placeholder="Password"
        name="password"
      />

      <Button
        width="100%"
        form="signup-form"
        onClick={handleSubmit}
        colorScheme="blue">
        Sign up
      </Button>
      <div className="form-footer-links">
        <FormLink
          linkText="Already have an account?"
          href={`/${ROUTES.login}`}
        />
        <FormLink
          linkText="Forgot Password"
          href={`${ROUTES.forgotPassword}`}
          className="small-text"
        />
      </div>
    </AuthFormWrapper>
  );
};

export default SignupPage;
