import { ROUTES } from '../../util/constants';
import { withAuthSsp } from '../../lib/hocs';
import LoginPage from '../../components/auth/LoginPage';
import { useEffect, useState } from 'react';

const login = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return !isSSR ? <LoginPage /> : null;
};

export const getServerSideProps = withAuthSsp(
  async (ctx, currentUser) => {
    const from = ctx.req.headers.referer!;
    const referredFromAuth = Boolean(from) && from?.indexOf('auth') > -1;

    if (currentUser && currentUser?.isVerified) {
      return {
        redirect: {
          destination: referredFromAuth ? ROUTES.home : from,
          permanent: false,
        },
      };
    }
    return null;
  },
  {
    protected: false,
  },
);

export default login;
