import { HomeContextProvider, IBoard, Workspace } from '../lib/providers';
import { withAuthComponent, withAuthSsp } from '../lib/hocs';
import API from '../api';
import HomePage from '../components/home/HomePage';
import { useEffect, useState } from 'react';

interface IProps {
  data?: { boards: IBoard[]; workspaces: Workspace[] };
}

const index = ({ data }: IProps) => {
  const [isSSR, setIsSSR] = useState<boolean>(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return !isSSR ? (
    <HomeContextProvider data={data}>
      <HomePage />
    </HomeContextProvider>
  ) : null;
};

export const getServerSideProps = withAuthSsp(
  async context => {
    const ssRequest = new API(context?.req?.headers);

    const boards = await ssRequest
      .getBoards()
      .then(res => res?.data)
      .catch(error => {
        console.log(error);
        return null;
      });

    const notifications = await ssRequest
      .getNotifications()
      .then(res => res?.data)
      .catch(() => null);

    const templates = await ssRequest
      .getTemplates()
      .then(res => res?.data)
      .catch(() => null);

    const workspaces = await ssRequest
      .getWorkspaces()
      .then(res => res?.data)
      .catch(() => null);

    const response = { boards, notifications, templates, workspaces };

    return response;
  },
  {
    protected: true,
  },
);

export default withAuthComponent(index);
