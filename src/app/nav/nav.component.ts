import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html'
})
export class NavComponent implements OnInit {
  isSignedIn: boolean;

  constructor(private authService: AuthService) {
    this.authService.isUserSignedIn.subscribe(value => {
      this.isSignedIn = value;
    });
  }

  ngOnInit(): void {
    this.isSignedIn = this.authService.isSignedIn();
  }

  signOut(): void {
    this.authService.signOut();
  }
}
