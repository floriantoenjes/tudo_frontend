import {Component, OnInit} from '@angular/core';
import {ContactRequest} from '../shared/contact-request.model';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-contact-requests',
  templateUrl: './contact-requests.component.html',
  styleUrls: ['./contact-requests.component.css']
})
export class ContactRequestsComponent implements OnInit {
  contactRequests: ContactRequest[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getContactRequests().then(response =>
      this.contactRequests = response
    );
  }

  acceptContact(contactRequest: ContactRequest): void {
    this.userService.addContact(contactRequest.sender.id).then(response => {
      const index = this.contactRequests.indexOf(contactRequest);
      this.contactRequests.splice(index, 1);
    });
  }

}
