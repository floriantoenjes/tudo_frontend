import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string;
  password: string;

  constructor(private alertService: AlertService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.authService.signIn(this.username, this.password)
      .then(response => {
        this.router.navigateByUrl('');
      }).catch(reason => {
        if (reason.status === 401) {
          this.alertService.error('Username or password don\'t match.');
        }
    });
  }
}
