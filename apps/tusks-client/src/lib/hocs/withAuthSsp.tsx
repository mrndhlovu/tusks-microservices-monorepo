import { GetServerSidePropsContext } from 'next';
import API from '../../api';
import { ROUTES } from '../../util/constants';
import { IUser } from '../providers';

interface IOptions {
  protected: boolean;
}

export const withAuthSsp = (
  getServerSideProps?: (
    context: GetServerSidePropsContext,
    user?: IUser,
  ) => Promise<any>,
  options?: IOptions,
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const ssRequest = new API(ctx.req.headers);

    const currentUser: IUser | null = await ssRequest
      .getCurrentUser()
      .then(res => res?.data)
      .catch(() => null);

    if (!currentUser && options?.protected) {
      return {
        redirect: {
          destination: `/${ROUTES.login}`,
          permanent: false,
        },
      };
    }

    if (getServerSideProps && getServerSideProps instanceof Function) {
      const response = (await getServerSideProps(ctx, currentUser!)) || null;
      if (response?.redirect) return response;

      return { props: { currentUser, data: response } };
    }

    return { props: { currentUser } };
  };
};
