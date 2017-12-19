import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  title = 'User List';
  users: User[] = [];

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().then(response => {
      this.users = response.filter(user => user.id !== Number(this.authService.getUserId()));
    });
  }
}
