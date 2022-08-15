import { useAuth, useGlobalState } from '../../lib/providers';
import BoardsGroup from './BoardsGroup';

const BoardList = () => {
  const { boards, workspaces } = useGlobalState();
  const { user } = useAuth();

  const starredBoards = boards?.filter(board =>
    user?.starredBoards?.includes(board!.id!),
  );
  const viewedRecentBoards = boards
    ?.filter(board => user?.viewedRecent.includes(board.id))
    .sort((a, b) => {
      const dateA = new Date(a.lastViewed).getTime();
      const dateB = new Date(b.lastViewed).getTime();

      return dateA < dateB ? 1 : -1;
    })
    .slice(0, 6);

  const sortedWorkSpaces = workspaces?.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateA < dateB ? 1 : -1;
  });

  return (
    <>
      <BoardsGroup
        heading="Starred boards"
        icon="star"
        boards={starredBoards}
        category="starred"
      />
      <BoardsGroup
        heading="Recently viewed"
        icon="clock"
        boards={viewedRecentBoards}
        category="recent"
      />

      <h5>YOUR WORKSPACES</h5>

      {sortedWorkSpaces?.map(workspace => {
        return (
          <BoardsGroup
            heading={`${workspace.name} workspace`}
            boards={boards?.filter(board =>
              workspace?.boards?.includes(board?.id!),
            )}
            category="workspaces"
            workspaceId={workspace.id}
            iconColor={workspace?.iconColor}
            isDefault={workspace.category === 'default'}
            key={workspace.id}
          />
        );
      })}
    </>
  );
};

export default BoardList;
