import { IAccountFields, Subjects } from '../../api-util-interfaces';

export interface IAccountCreatedEvent {
  subject: Subjects.AccountCreated;
  data: IAccountFields;
}

export interface ICustomerCreated {
  subject: Subjects.CustomerCreated;
  data: {
    userId: string;
    customerId: string;
  };
}

export interface ICustomerDeleted {
  subject: Subjects.CustomerDeleted;
  data: {
    userId: string;
    customerId: string;
  };
}

export interface IAccountUpdatedEvent {
  subject: Subjects.AccountUpdated;
  data: IAccountFields;
}

export interface IAccountDeletedEvent {
  subject: Subjects.AccountDeleted;
  data: {
    email: string;
    userId: string;
  };
}
