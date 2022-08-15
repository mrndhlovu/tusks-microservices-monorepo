import { useAuth, useGlobalState, Workspace } from '../../lib/providers';
import BoardsGroup from '../home/BoardsGroup';

const BoardLists = ({ workspace }: { workspace: Workspace }) => {
  const { boards } = useGlobalState();
  const { user } = useAuth();

  return (
    <div>
      <BoardsGroup
        category="workspaces"
        heading={workspace.name}
        iconColor={workspace.iconColor}
        workspaceId={workspace.id}
        boards={boards?.filter(board =>
          workspace?.boards?.includes(board?.id!),
        )}
        disableHeader
      />
    </div>
  );
};

export default BoardLists;
