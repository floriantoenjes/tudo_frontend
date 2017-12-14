import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  title: String = 'User List';
  users: User[];

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().then(response => {
      // ToDo: Change to triple equals
      this.users = response.filter(user => user.id != this.authService.getUserId());
    });
  }
}
