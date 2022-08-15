import { Subjects } from '../../api-util-interfaces';

export interface IWorkspaceCreatedEvent {
  subject: Subjects.WorkspaceCreated;
  data: {
    id: string;
    ownerId: string;
  };
}

export interface IWorkspaceUpdatedEvent {
  subject: Subjects.WorkspaceUpdated;
  data: {
    id: string;
    ownerId: string;
    data?: { [key: string]: any };
  };
}
