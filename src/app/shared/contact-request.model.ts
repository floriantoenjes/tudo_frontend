import {User} from './user.model';

export class ContactRequest {
  sendAt: Date;
  receiver: User;
  sender: User;
}
