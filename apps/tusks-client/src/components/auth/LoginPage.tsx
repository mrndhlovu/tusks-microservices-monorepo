import { useRef } from 'react';
import { Button } from '@chakra-ui/react';
import { FORM_VALIDATION } from '../../util/formhelpers';
import { ROUTES } from '../../util/constants';
import { UIFormInput } from '../shared';
import { useAuth } from '../../lib/providers';
import AuthFormWrapper from './AuthFormWrapper';
import FormLink from './FormLink';

const initialState = {
  identifier: '',
  password: '',
};

const LoginPage = () => {
  const { login } = useAuth();
  const formRef = useRef<any>();

  const handleSubmit = (ev: MouseEvent) => {
    ev.preventDefault();

    const formData = {
      identifier: formRef.current?.values?.identifier,
      password: formRef.current?.values?.password,
    };

    login(formData);
  };

  return (
    <AuthFormWrapper
      heading="Login to your account"
      initialState={initialState}
      ref={formRef}
      formId="login-form"
      validationSchema={FORM_VALIDATION.LOGIN}>
      <UIFormInput required placeholder="Username or Email" name="identifier" />
      <UIFormInput
        name="password"
        required
        placeholder="Password"
        type="password"
      />

      <Button
        width="100%"
        form="login-form"
        onClick={handleSubmit}
        colorScheme="blue">
        Login
      </Button>
      <div className="form-footer-links">
        <FormLink linkText="Sign up for an account" href={`${ROUTES.signup}`} />
        <FormLink
          linkText="Forgot Password"
          href={`${ROUTES.forgotPassword}`}
          className="small-text"
        />
      </div>
    </AuthFormWrapper>
  );
};

export default LoginPage;
