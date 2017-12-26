import {User} from './user.model';

export class ContactRequest {
  id: number;
  sendAt: Date;
  receiver: User;
  sender: User;
}
