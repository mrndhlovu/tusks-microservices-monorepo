import { Publisher } from '@tusks/api/shared-services';
import { IWorkspaceCreatedEvent, Subjects } from '@tusks/api/util-interfaces';

export class WorkspaceCreatedPublisher extends Publisher<IWorkspaceCreatedEvent> {
  subject: Subjects.WorkspaceCreated = Subjects.WorkspaceCreated;
}
