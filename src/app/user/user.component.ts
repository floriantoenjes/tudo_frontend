import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User = new User();
  contacts: User[];
  isContact: boolean;
  isContactRequestSent: boolean;
  loaded: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getUser(+params['userId']).then(response => {
        this.user = response;

        this.userService.getContacts().then(contacts => {
          this.contacts = contacts;

          this.userService.getContactRequest(this.user.username).then(res => {
            this.isContactRequestSent = true;
            return;
          }).catch( error => {
          }).then( obj => {
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
    });
  }

  sendContactRequest(): void {
    this.userService.sendContactRequest(this.user).then(response => {
      this.isContactRequestSent = true;
    });
  }

  removeContact(): void {
    this.userService.removeContact(this.user.id).then(response => {
      this.router.navigateByUrl('/contacts');
    });
  }
}
