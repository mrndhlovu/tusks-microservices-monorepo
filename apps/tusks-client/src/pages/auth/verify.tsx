import { useEffect, useLayoutEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { ROUTES } from '../../util/constants';
import { withAuthSsp } from '../../lib/hocs';
import VerificationPage from '../../components/auth/VerificationPage';
import { useRouter } from 'next/router';

interface IProps {
  data: string;
}

const index = ({ data }: IProps) => {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setIsSSR(false);
  }, []);

  useLayoutEffect(() => {
    router.replace(router.pathname, undefined, { shallow: true });
  }, []);

  return !isSSR ? <VerificationPage token={data} /> : null;
};

export const getServerSideProps = withAuthSsp(
  async (context: GetServerSidePropsContext, currentUser) => {
    if (currentUser && currentUser?.isVerified) {
      return {
        redirect: {
          destination: ROUTES.home,
          permanent: false,
        },
      };
    }

    const token = context?.query?.token as string;

    if (!token) return null;
    return token;
  },
  {
    protected: false,
  },
);

export default index;
