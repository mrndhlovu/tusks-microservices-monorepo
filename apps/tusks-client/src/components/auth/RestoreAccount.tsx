import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import {
  FORM_VALIDATION,
  OTP_CONFIRM_PASSWORD_VALIDATION,
} from '../../util/formhelpers';
import { ROUTES } from '../../util/constants';
import { UIFormInput } from '../shared';
import AuthFormWrapper from './AuthFormWrapper';
import FormLink from './FormLink';
import { apiClient } from '../../api';

const initialState = {
  email: '',
};

const passwordInitialState = {
  password: '',
  'confirm-password': '',
  verificationCode: '',
};

const RestoreAccount = () => {
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
        .restoreAccountVerifyEmail(formRef.current?.values)
        .then(res => {
          setActiveStep('password');
          formRef.current.email = '';
        })
        .catch(error => {});
      return;
    }

    await apiClient
      .restoreAccount(formRef.current.values)
      .then(() => router.push(`/${ROUTES.login}`))
      .catch(error => {});
  };

  const handleReset = () => {
    setActiveStep('email');
    formRef.current.password = '';
    formRef.current.verificationCode = '';
    formRef.current['confirm-password'] = '';
  };

  return (
    <AuthFormWrapper
      heading="Restore Account"
      initialState={emailActive ? initialState : passwordInitialState}
      ref={formRef}
      formId="forgot-form"
      validationSchema={
        emailActive ? FORM_VALIDATION.EMAIL : OTP_CONFIRM_PASSWORD_VALIDATION
      }>
      {emailActive && (
        <UIFormInput required placeholder="Type your email here" name="email" />
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
          <UIFormInput
            required
            placeholder="One Time Pin"
            name="verificationCode"
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
        {passwordActive && (
          <FormLink linkText="Reset" handleClick={handleReset} />
        )}

        <FormLink
          className="small-text"
          linkText="Sign up for an account"
          href={`${ROUTES.signup}`}
        />

        <FormLink
          className="small-text"
          linkText="Already have an account"
          href={`${ROUTES.login}`}
        />
      </div>
    </AuthFormWrapper>
  );
};

export default RestoreAccount;
