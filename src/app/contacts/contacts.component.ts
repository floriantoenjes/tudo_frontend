import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/models/user.model';

@Component({
  selector: 'app-contacts',
  templateUrl: '../users/users.component.html'
})
export class ContactsComponent implements OnInit {
  title = 'Contact List';
  noUsersMessage = 'You don\'t have any contacts yet.';
  users: User[] = [];
  loaded = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getContacts().then(response => {
      this.users = response;
      this.sortUsers(this.users);
      this.loaded = true;
    });
  }

  sortUsers(users: User[]) {
    users.sort((user1, user2) => {
      return user1.username.localeCompare(user2.username.toString());
    });
  }
}
