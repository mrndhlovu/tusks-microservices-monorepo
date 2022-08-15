import { GetServerSidePropsContext } from 'next';

import { ROUTES } from '../../util/constants';
import { withAuthComponent, withAuthSsp } from '../../lib/hocs';
import API from '../../api';

const Index = () => {
  return <div className="spinner">Loading</div>;
};

export const getServerSideProps = withAuthSsp(
  async (ctx: GetServerSidePropsContext, currentUser) => {
    const ssrRequest = new API(ctx.req?.headers);
    const requestCode = ctx.query?.code;

    return await ssrRequest
      .getSpotifyAuthToken(requestCode as string)
      .then(res => {
        return {
          redirect: {
            destination: `/${currentUser?.username}/settings/?newSpotify=true`,
            permanent: false,
          },
        };
      })
      .catch(err => {
        console.log(err);

        return {
          redirect: {
            destination: ROUTES.home,
            permanent: false,
          },
        };
      });
  },
  { protected: true },
);

export default withAuthComponent(Index);
