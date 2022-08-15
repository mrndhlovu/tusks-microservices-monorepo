import { FORM_VALIDATION } from '../../util/formhelpers';
import { ROUTES } from '../../util/constants';
import AuthFormWrapper from './AuthFormWrapper';
import FormLink from './FormLink';

interface IProps {
  boardInviteId?: string;
}

const AcceptBoardInvite = ({ boardInviteId }: IProps) => {
  return (
    <AuthFormWrapper
      heading="Board invite"
      initialState={{}}
      formId="accept-form"
      validationSchema={FORM_VALIDATION.VERIFY_LOGIN}>
      <p>Please sign up first to view the board</p>

      <div className="form-footer-links">
        <FormLink
          className="small-text"
          linkText="Sign up for an account"
          href={`/${ROUTES.signup}?boardInviteId=${boardInviteId}`}
        />
      </div>
    </AuthFormWrapper>
  );
};

export default AcceptBoardInvite;
