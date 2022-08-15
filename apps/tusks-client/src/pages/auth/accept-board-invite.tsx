import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { withAuthSsp } from '../../lib/hocs';
import API from '../../api';
import { ROUTES } from '../../util/constants';

interface IProps {
  data: {
    boardInviteId: string;
  };
}

const index = ({ data }: IProps) => {
  const [isSSR, setIsSSR] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setIsSSR(false);
  }, []);

  useEffect(() => {
    router.replace(router.pathname, undefined, { shallow: true });
  }, []);

  return null;
};

export const getServerSideProps = withAuthSsp(
  async (context: GetServerSidePropsContext, currentUser) => {
    const ssRequest = new API(context?.req?.headers);
    const { token, boardInviteId } = context?.query;

    if (!boardInviteId) return null;

    const response = await ssRequest
      .acceptBoardInvite(token! as string, boardInviteId! as string)
      .catch(err => err);

    if (response?.status === 200 && currentUser) {
      return {
        redirect: {
          destination: `/board/${boardInviteId}`,
          permanent: false,
        },
      };
    }

    if (response?.status === 200 && !currentUser) {
      return {
        redirect: {
          destination: `/${ROUTES.login}`,
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: `/${ROUTES.signup}?notify=board-invite`,
        permanent: false,
      },
    };
  },
  {
    protected: false,
  },
);

export default index;
