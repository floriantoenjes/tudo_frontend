import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user.model';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  passwordAgain: string;

  constructor(private alertService: AlertService, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signUp(): void {
    if (this.user.password !== this.passwordAgain) {
      this.alertService.error('Passwords have to match.');
      return;
    }

    this.authservice.signUp(this.user).then(response => {
      this.authservice.signIn(this.user.username, this.user.password).then(()  => {
        this.router.navigateByUrl('');
      });
    });
  }
}
