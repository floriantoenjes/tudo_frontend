import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User = new User();
  contacts: User[];
  isContact: Boolean;
  loaded: Boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getUser(+params['userId']).then(response => {
        this.user = response;

        this.userService.getContacts().then(contacts => {
          this.contacts = contacts;
          this.contacts.forEach(contact => {
            if (contact.username === this.user.username) {
              this.isContact = true;
              return;
            }
          });
          this.loaded = true;
        });
      });
    });
  }

  sendContactRequest(): void {
    this.userService.sendContactRequest(this.user);
  }
}
