import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  title: String = 'User List';
  users: User[];

  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    this.userService.getUsers().then(response => {
      // ToDo: Change id to be the one of the signed in user
      this.users = response.filter(user => user.id !== 1);
    });
  }
}
