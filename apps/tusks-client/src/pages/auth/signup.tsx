import { ROUTES } from '../../util/constants';
import { withAuthSsp } from '../../lib/hocs';
import SignupPage from '../../components/auth/SignupPage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const index = () => {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(() => {
    if (router.query?.notify === 'board-invite') {
      const event = new CustomEvent('ERROR_NOTIFICATION', {
        detail: 'Sign up to view the board',
      });
      window?.dispatchEvent(event);
    }
  }, [router.query?.notify]);

  useEffect(() => {
    router.replace(router.pathname, undefined, { shallow: true });
  }, []);

  return !isSSR ? (
    <SignupPage boardInviteId={router?.query?.boardInviteId as string} />
  ) : null;
};

export const getServerSideProps = withAuthSsp(
  async (ctx, currentUser) => {
    if (currentUser?.id && !currentUser?.isVerified) {
      return {
        redirect: {
          destination: `/${ROUTES.verify}`,
          permanent: false,
        },
      };
    }

    if (currentUser && currentUser?.isVerified) {
      return {
        redirect: {
          destination: ROUTES.home,
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

export default index;
