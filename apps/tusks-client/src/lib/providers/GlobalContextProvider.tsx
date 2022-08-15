import {
  createContext,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useToast } from '@chakra-ui/react';

import { apiClient } from '../../api';
import { IBoard, useAuth, Workspace } from '.';
import { useLocalStorage } from '../hooks';
import { useRouter } from 'next/router';
import { ROUTES } from '../../util/constants';

export type IUIRequestError = string[];

export interface IToastProps {
  title?: string;
  description: string | string[];
  status?: 'info' | 'warning' | 'success' | 'error';
  duration?: number;
  placement?:
    | 'top-right'
    | 'top'
    | 'top-left'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom';
}

export interface IThemeMode {
  darkMode: boolean;
}

export interface ITemplate {
  name: string;
  bgColor: string;
  bgImage?: string;
  category: string;
  description: string;
  visibility: string;
  lists: [{ name: string }];
  id: string;
}

export interface INotification {
  body: string;
  isRead: boolean;
  isVerified: boolean;
  subject: string;
  title: string;
  id: string;
  createdAt: string;
  archived: boolean;
}

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const { pathname, push } = useRouter();
  const toast = useToast();
  const [theme, setTheme] = useLocalStorage<string, IThemeMode>('theme', {
    darkMode: false,
  });
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const notificationEventRef = useRef((e: CustomEvent) => {
    notify({ description: e.detail, status: 'error' });
  });

  const refetchBoardsAndWorkspaces =
    workspaces?.length === 0 && pathname !== '/' && isAuthenticated;

  const handleModeChange = () => {
    return setTheme((prev: IThemeMode) => {
      return { ...prev, darkMode: !prev?.darkMode };
    });
  };

  const rehydrateBoardsList = useCallback(
    (newBoard: IBoard) => {
      setBoards(prev => [
        ...prev.map(board => (board?.id === newBoard?.id ? newBoard : board)),
      ]);
    },
    [boards],
  );

  const rehydrateNotifications = () => {
    apiClient
      .getNotifications()
      .then(res => setNotifications(prev => [...prev, ...res?.data]))
      .catch(() => null);
  };

  const handleUseTemplate = (ev: MouseEvent) => {
    ev.preventDefault();

    notify({ description: 'Processing...', duration: 6000 });

    const selectedTemplate = templates.find(
      item => item.id === ev.currentTarget.id,
    );

    const data = {
      title: selectedTemplate.name,
      workspaceId: workspaces?.[0]?.id,
      activeBg: selectedTemplate?.bgImage ? 'image' : 'color',
      prefs: {
        color: selectedTemplate?.bgColor,
        image: selectedTemplate?.bgImage,
      },
      templateLists: selectedTemplate.lists,
    };

    apiClient
      .createNewBoard(data)
      .then(res => {
        push(`/${ROUTES.board}/${res?.data?.id}`);
      })
      .catch(err => {});
  };

  const updateInitialState = useCallback(data => {
    setBoards(data.boards);
    setWorkspaces(data.workspaces);
    setTemplates(data.templates);
    setNotifications(data.notifications);
  }, []);

  const notify = useCallback(
    (msg: IToastProps) => {
      const data = {
        title: msg.title,
        status: msg.status || 'success',
        duration: msg.duration,
        isClosable: true,
        position: msg.placement || 'top-right',
      };

      if (typeof msg.description === 'string') {
        return toast({
          ...data,
          description: msg.description,
        });
      }

      return msg.description.map(desc =>
        toast({
          ...data,
          description: desc,
        }),
      );
    },
    [toast],
  );

  useEffect(() => {
    if (!refetchBoardsAndWorkspaces) return;
    (async () => {
      const promises = [
        apiClient
          .getBoards()
          .then(res => res?.data)
          .catch(() => null),

        apiClient
          .getWorkspaces()
          .then(res => res?.data)
          .catch(() => null),

        apiClient
          .getTemplates()
          .then(res => res?.data)
          .catch(() => null),

        apiClient
          .getNotifications()
          .then(res => res?.data)
          .catch(() => null),
      ];

      const data = await Promise.all(promises);

      setBoards(data?.[0]);
      setWorkspaces(data?.[1]);
      setTemplates(data?.[2]);
      setNotifications(
        data?.[3]?.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();

          return dateA > dateB ? 1 : -1;
        }),
      );
    })();
  }, [refetchBoardsAndWorkspaces]);

  useEffect(() => {
    if (!window && notificationEventRef.current) return;

    window.addEventListener(
      'ERROR_NOTIFICATION',
      notificationEventRef.current,
      false,
    );
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        boards,
        workspaces,
        darkMode: theme?.darkMode,
        handleModeChange,
        notify,
        rehydrateBoardsList,
        updateInitialState,
        setWorkspaces,
        setBoards,
        templates,
        handleUseTemplate,
        notifications,
        setNotifications,
        rehydrateNotifications,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

interface IDefaultGlobalState {
  boards: IBoard[];
  darkMode: boolean;
  handleModeChange: () => void;
  notify: (option: IToastProps) => void;
  workspaces: Workspace[];
  updateInitialState: (boards: {
    boards?: IBoard[];
    workspaces?: Workspace[];
  }) => void;
  rehydrateBoardsList: (board: IBoard) => void;
  setWorkspaces: Dispatch<SetStateAction<Workspace[]>>;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
  templates: ITemplate[];
  handleUseTemplate: (ev: MouseEvent) => void;
  notifications: INotification[];
  rehydrateNotifications: () => void;
  setNotifications: Dispatch<SetStateAction<INotification[]>>;
}

export const GlobalContext = createContext<IDefaultGlobalState>(
  {} as IDefaultGlobalState,
);

export const useGlobalState = () => useContext(GlobalContext);

export { GlobalContextProvider };
