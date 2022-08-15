import { useLayoutEffect, useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import {
  CONFIRM_PASSWORD_VALIDATION,
  FORM_VALIDATION,
} from '../../util/formhelpers';
import { ROUTES } from '../../util/constants';
import { UIFormInput } from '../shared';
import { useGlobalState } from '../../lib/providers';
import AuthFormWrapper from './AuthFormWrapper';
import FormLink from './FormLink';
import { apiClient } from '../../api';
import { useRouter } from 'next/router';

const initialState = {
  email: '',
};

const passwordInitialState = {
  password: '',
  'confirm-password': '',
};

const ForgotPassword = ({ token }: { token: string }) => {
  const { notify } = useGlobalState();
  const router = useRouter();
  const formRef = useRef<any>();
  const [activeStep, setActiveStep] = useState<string>('email');
  const emailActive = activeStep === 'email';
  const passwordActive = activeStep === 'password';
  const messageActive = activeStep === 'message';

  const handleSubmit = async (ev: MouseEvent) => {
    ev.preventDefault();

    if (emailActive) {
      await apiClient
        .forgotPassword(formRef.current?.values)
        .then(res => {
          setActiveStep('message');
          formRef.current.email = '';
          notify({ description: res.data.message, placement: 'top' });
        })
        .catch(error => {});
      return;
    }

    await apiClient
      .updatePassword({ password: formRef.current.values.password }, token)
      .then(() => router.push(`/${ROUTES.login}`))
      .catch(error => {});
  };

  useLayoutEffect(() => {
    if (!token) return;
    router.replace(router.pathname, undefined, { shallow: true });
    setActiveStep('password');
  }, [token]);

  return (
    <AuthFormWrapper
      heading="Forgot Password"
      initialState={emailActive ? initialState : passwordInitialState}
      ref={formRef}
      formId="forgot-form"
      validationSchema={
        emailActive ? FORM_VALIDATION.EMAIL : CONFIRM_PASSWORD_VALIDATION
      }>
      {emailActive && (
        <UIFormInput required placeholder="Type your email here" name="email" />
      )}

      {messageActive && (
        <p>Use the link sent to your email to update your password</p>
      )}

      {passwordActive && (
        <>
          <UIFormInput
            required
            placeholder="Type your new password"
            name="password"
            type="password"
          />
          <UIFormInput
            required
            placeholder="Confirm new password"
            name="confirm-password"
            type="password"
          />
        </>
      )}
      <Button
        width="100%"
        form="forgot-form"
        onClick={handleSubmit}
        colorScheme="blue"
        disabled={messageActive}>
        Submit
      </Button>
      <div className="form-footer-links">
        <FormLink linkText="Already have an account" href={`${ROUTES.login}`} />
        <FormLink linkText="Sign up for an account" href={`${ROUTES.signup}`} />
      </div>
    </AuthFormWrapper>
  );
};

export default ForgotPassword;
