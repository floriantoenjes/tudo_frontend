import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) {
  }


  ngOnInit(): void {
    this.userService.getUsers().then(response => {
      this.users = response;
    });
  }
}
