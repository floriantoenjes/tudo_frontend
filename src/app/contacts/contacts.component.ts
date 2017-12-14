import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-contacts',
  templateUrl: '../users/users.component.html'
})
export class ContactsComponent implements OnInit {
  title: String = 'Contact List';
  users: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getContacts().then(response => {
      this.users = response;
      this.sortUsers(this.users);
    });
  }

  sortUsers(users: User[]) {
    users.sort((user1, user2) => {
      return user1.username.localeCompare(user2.username.toString());
    });
  }
}
