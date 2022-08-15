import { useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { FORM_VALIDATION } from '../../util/formhelpers';
import { ROUTES } from '../../util/constants';
import { UIFormInput } from '../shared';
import { useAuth } from '../../lib/providers';
import AuthFormWrapper from './AuthFormWrapper';
import FormLink from './FormLink';

const validationInitialState = {
  verificationCode: '',
};

const emailInitialState = {
  email: '',
};

interface IProps {
  token?: string;
}

const VerificationPage = ({ token }: IProps) => {
  const { verifyLogin, requestNewVerificationCode } = useAuth();
  const [requestNewCode, setRequestNewCode] = useState<boolean>();

  const formRef = useRef<any>();

  const handleSubmitCode = (ev: MouseEvent) => {
    ev.preventDefault();
    verifyLogin(formRef.current?.values, token!);
  };

  const handleSubmitEmail = (ev: MouseEvent) => {
    ev.preventDefault();
    requestNewVerificationCode(formRef.current?.values);
    setRequestNewCode(false);
  };

  const handleRequestNewCode = (e: MouseEvent) => {
    e.preventDefault();
    setRequestNewCode(prev => !prev);
  };

  return (
    <AuthFormWrapper
      heading="Verify email verification"
      initialState={requestNewCode ? emailInitialState : validationInitialState}
      ref={formRef}
      formId="verification-form"
      validationSchema={
        requestNewCode ? FORM_VALIDATION.EMAIL : FORM_VALIDATION.VERIFY_LOGIN
      }>
      {!requestNewCode && (
        <p>Please enter the verification code sent to you email</p>
      )}
      {!requestNewCode && (
        <UIFormInput
          required
          placeholder="Enter verification code here."
          name="verificationCode"
        />
      )}

      {requestNewCode && (
        <UIFormInput required placeholder="Enter your email" name="email" />
      )}

      <Button
        width="100%"
        form="verification-form"
        onClick={requestNewCode ? handleSubmitEmail : handleSubmitCode}
        colorScheme="blue">
        Submit
      </Button>
      <div className="form-footer-links">
        {requestNewCode && (
          <FormLink
            linkText="I have the code."
            handleClick={handleRequestNewCode}
          />
        )}
        {!requestNewCode && (
          <FormLink
            linkText="Request a new code"
            handleClick={handleRequestNewCode}
          />
        )}

        {!requestNewCode && (
          <>
            <FormLink
              className="small-text"
              linkText="I already have an account."
              href={`/${ROUTES.login}`}
            />
            <FormLink
              className="small-text"
              linkText="Sign up for an account"
              href={`/${ROUTES.signup}`}
            />
          </>
        )}
      </div>
    </AuthFormWrapper>
  );
};

export default VerificationPage;
