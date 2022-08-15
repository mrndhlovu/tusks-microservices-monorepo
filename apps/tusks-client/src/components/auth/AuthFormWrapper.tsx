import { forwardRef, ReactElement, ReactNode, useEffect } from 'react';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { useAuth } from '../../lib/providers';
import { isBrowser } from '../../util';
import { UIForm } from '../shared';
import FormFeedback from './FormFeedback';

interface IProps {
  children: ReactNode;
  heading: string;
  initialState: { [key: string]: any };
  validationSchema: { [key: string]: any };
  formId: string;
}

const Container = styled.div`
  ${props => props.theme.mixins.flex('column')};
  justify-content: left;
  height: 100vh;
  width: 100vw;

  section {
    ${props => props.theme.styles.absoluteCenter};
    margin: 0px auto 24px;

    width: 400px;
    padding: 32px 40px;
    background-color: ${props => props.theme.colors.bgLight};
    border-radius: 3px;
    box-shadow: ${props => props.theme.colors.darkBoxShadowBorder};
    color: ${props => props.theme.colors.border};
    display: flex;
    flex-direction: column;
  }

  h5 {
    color: ${props => props.theme.colors.border};
  }

  .form-link {
    color: ${props => props.theme.colors.twitter};
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    display: block;

    li {
      list-style: none;
    }
  }

  .auth-form-feedback {
    color: ${props => props.theme.colors.error};
    padding-top: 16px;
    margin-top: 16px;
    border-top: 1px solid ${props => props.theme.colors.border};
    font-size: 14px;
    text-align: left;
    line-height: 20px;
  }

  .auth-form-button {
    position: relative;
    width: 100%;
  }

  .auth-form-header {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-bottom: 16px;
    color: ${props => props.theme.colors.border};
    font-size: 16px;
  }

  .form-footer-links {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
  }

  .small-text {
    font-size: 12px;
    color: ${props => props.theme.colors.border};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AuthFormWrapper = forwardRef<HTMLInputElement, IProps>(
  (
    { children, heading, initialState, validationSchema, formId },
    ref,
  ): ReactElement => {
    const { authError, dismissAuthError } = useAuth();

    const hasFormFeedback = !isEmpty(authError);

    useEffect(() => {
      if (hasFormFeedback) {
        setTimeout(() => {
          dismissAuthError();
        }, 6000);
      }
    }, [hasFormFeedback, dismissAuthError]);

    return (
      <Container className="auth-form-wrapper">
        <section>
          <div className="auth-form-header">
            <h5>{heading}</h5>
          </div>
          <UIForm
            id={formId}
            ref={ref}
            initialState={initialState}
            validationSchema={validationSchema}>
            {children}
          </UIForm>
        </section>
      </Container>
    );
  },
);

export default AuthFormWrapper;
