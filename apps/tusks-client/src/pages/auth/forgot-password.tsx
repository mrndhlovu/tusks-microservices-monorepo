import { ROUTES } from '../../util/constants';
import { withAuthSsp } from '../../lib/hocs';
import { useEffect, useState } from 'react';
import ForgotPassword from '../../components/auth/ForgotPassword';

const index = ({ data }: { data: string }) => {
  const [isSSR, setIsSSR] = useState<boolean>(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return !isSSR ? <ForgotPassword token={data} /> : null;
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
    const token = ctx?.query?.token as string;

    if (!token) return null;
    return token;
  },
  {
    protected: false,
  },
);

export default index;
