import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { isEmpty, omit } from 'lodash';

import { apiClient } from '../../api';
import { IBoard } from './HomeContextProvider';
import { ICardItem, IListItem } from '../../components/board/canvas/ListItem';
import { ROUTES } from '../../util/constants';
import { useGlobalState, useAuth } from '.';
import { IAttachment } from '../../components/board/canvas/cardActions/ChangeCover';
import { IAction } from '../../components/board/canvas/card/Activities';
import { usePrevious } from '../hooks';

interface IProps {
  board?: IBoard;
  children: ReactNode;
}

interface IUpdateStateOptions {
  isNew?: boolean;
}

interface IPagination {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number | null;
  pagingCounter: number | null;
  prevPage: number | null;
  totalDocs: number | null;
  totalPages: number | null;
}

const BoardContextProvider = ({ children, board }: IProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const previous = usePrevious({ pathname: router.asPath });
  const [activeBoard, setActiveBoard] = useState<IProps['board']>();
  const [attachments, setAttachments] = useState<IAttachment[]>([]);
  const [activities, setActivities] = useState<IAction[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);

  const isStarred = user?.starredBoards.includes(board?.id!);
  const boardIdChanged = previous?.pathname !== router.asPath;

  const imageCover = board.activeBg === 'image' ? board?.prefs.image : '';
  const colorCover = board?.prefs?.color;

  const sortedActionsList = activities?.sort((a, b) => {
    return (
      new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime()
    );
  });

  const saveBoardChanges = useCallback(
    async (update: IBoard): Promise<IBoard | void | undefined> => {
      return await apiClient
        .updateBoard(update, activeBoard.id)
        .then(res => res.data as IBoard)
        .catch(err => {});
    },
    [activeBoard],
  );

  const updateBoardState = (update: IBoard, options?: IUpdateStateOptions) => {
    if (options?.isNew) {
      return router.push(`/${ROUTES.board}/${update.id}`);
    }

    setActiveBoard(update);
  };

  const handleDeleteBoard = async () => {
    await apiClient
      .deleteBoard(activeBoard.id)
      .then(() => router.push(ROUTES.home))
      .catch(err => {});
  };

  const findCardsByListId = useCallback(
    (id: string): [ICardItem[], boolean] => {
      const cards = board.cards.filter(
        (card: ICardItem) => card?.listId === id,
      );
      const hasCards = !isEmpty(cards);
      return [cards, hasCards];
    },
    [board?.cards],
  );

  const findListById = useCallback(
    (id: string): [IListItem, boolean] => {
      const list = board.lists.find((list: IListItem) => list?.id === id);
      const hasCards = !isEmpty(list?.cards);
      return [list, hasCards];
    },
    [board?.lists],
  );

  const closeBoard = async () => {
    await apiClient
      .deleteBoard(activeBoard.id)

      .then(() => router.push(ROUTES.home))
      .catch(err => {});
  };

  const fetchAndUpdateAttachments = (attachmentId: string) => {
    apiClient
      .getActionByAttachmentId(board.id, attachmentId)
      .then(res => {
        updateActionsList(res.data);
      })
      .catch(() => null);
  };

  const updateActionsList = (data: IAction, options?: { edited: false }) => {
    if (options?.edited) {
      setActivities(prev => [
        ...prev.map(item => (item.id === data.id ? data : item)),
      ]);
      return;
    }

    setActivities(prev => [...prev, data]);
  };

  const fetchAndUpdateActions = (attachmentIds: string) => {
    apiClient
      .getActionByAttachmentId(board.id, attachmentIds)
      .then(res => {
        setActivities(prev => [...prev, ...res.data]);
      })
      .catch(() => null);
  };

  const loadMoreActions = () => {
    if (!pagination.hasNextPage) return;
    const queryString = `?limit=10&page=${pagination.nextPage}`;

    apiClient
      .getActions(board.id, queryString)
      .then(res => {
        setActivities(prev => [...prev, ...res.data?.docs]);
        const paginationProps = omit(res.data, ['docs']) as IPagination;
        setPagination(paginationProps);
      })
      .catch(err => {});
  };

  const toggleDrawerMenu = () => setDrawerOpen(prev => !prev);

  useEffect(() => {
    setActiveBoard(board);
  }, []);

  useEffect(() => {
    if (!board?.id) return;
    const getData = async () => {
      const queryString = `?limit=10&page=0`;
      const boardPromises = [
        apiClient
          .getAttachments(board?.id)
          .then(res => res.data)
          .catch(res => undefined),
        apiClient
          .getActions(board.id, queryString)
          .then(res => res.data)
          .catch(res => undefined),
      ];

      const response = await Promise.all(boardPromises);

      if (!response) return;

      setAttachments(response?.[0]);
      setActivities(response?.[1]?.docs);

      const paginationProps = omit(response?.[1], ['docs']) as IPagination;
      setPagination(paginationProps);
    };

    getData();
  }, [board?.id]);

  useEffect(() => {
    if (!boardIdChanged) return;
    (async () => {
      apiClient
        .getBoardById(board.id)
        .then(res => {
          setActiveBoard(res.data);
        })
        .catch(err => {});
    })();
  }, [boardIdChanged, board.id]);

  return (
    <BoardContext.Provider
      value={{
        activities: sortedActionsList,
        attachments,
        board: activeBoard,
        boardId: board.id,
        closeBoard,
        colorCover,
        drawerOpen,
        fetchAndUpdateActions,
        fetchAndUpdateAttachments,
        findCardsByListId,
        findListById,
        handleDeleteBoard,
        imageCover,
        isStarred,
        saveBoardChanges,
        setActiveBoard,
        setActivities,
        setAttachments,
        toggleDrawerMenu,
        updateActionsList,
        updateBoardState,
        pagination,
        loadMoreActions,
      }}>
      {children}
    </BoardContext.Provider>
  );
};

interface IBoardContext {
  activities: IAction[];
  attachments: IAttachment[];
  board?: IBoard;
  boardId: string;
  boards?: IBoard[];
  closeBoard: () => void;
  colorCover: string;
  drawerOpen: boolean;
  fetchAndUpdateActions: (attachmentId: string) => void;
  fetchAndUpdateAttachments: (attachmentId: string) => void;
  findCardsByListId: (listId: string) => [IBoard['cards']?, boolean?];
  findListById: (listId: string) => [IListItem?, boolean?];
  handleDeleteBoard: () => void;
  imageCover: string;
  isStarred: boolean;
  saveBoardChanges: (board?: IBoard) => Promise<IBoard | void>;
  setActiveBoard: (board?: IBoard) => void;
  setActivities: Dispatch<SetStateAction<IAction[]>>;
  setAttachments: Dispatch<SetStateAction<IAttachment[]>>;
  toggleDrawerMenu: () => void;
  updateActionsList: (data: IAction, options?: { edited: boolean }) => void;
  updateBoardState: (board?: IBoard) => void;
  pagination: IPagination;
  loadMoreActions: () => void;
}

export const BoardContext = createContext<IBoardContext>({} as IBoardContext);
export const useBoard = () => useContext(BoardContext);

export { BoardContextProvider };
