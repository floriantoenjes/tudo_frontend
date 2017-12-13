import {Component} from '@angular/core';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: 'nav.component.html'
})
export class NavComponent {

  constructor(private authService: AuthService) {
  }

  signOut(): void {
    this.authService.signOut();
  }
}
