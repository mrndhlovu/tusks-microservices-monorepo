import { Subjects } from '../../api-util-interfaces';

export interface IEmailEvent {
  subject: Subjects.Email;
  data: {
    body?: string;
    cc?: string;
    email: string;
    from: string;
    subject: string;
    html?: string;
  };
}
