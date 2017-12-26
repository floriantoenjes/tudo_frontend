import {Component, OnInit} from '@angular/core';
import {ContactRequest} from '../shared/models/contact-request.model';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-contact-requests',
  templateUrl: './contact-requests.component.html',
  styleUrls: ['./contact-requests.component.css']
})
export class ContactRequestsComponent implements OnInit {
  contactRequests: ContactRequest[] = [];
  loaded = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getContactRequests().then(response => {
      this.contactRequests = response;
      this.loaded = true;
    });
  }

  acceptContact(contactRequest: ContactRequest): void {
    this.userService.addContact(contactRequest.sender.id).then(response => {
      const index = this.contactRequests.indexOf(contactRequest);
      this.contactRequests.splice(index, 1);
    });
  }

  declineContact(contactRequest: ContactRequest): void {
    this.userService.deleteContactRequest(contactRequest).then(() => {
      this.contactRequests.filter(cR => cR !== contactRequest);
    });
  }
}
