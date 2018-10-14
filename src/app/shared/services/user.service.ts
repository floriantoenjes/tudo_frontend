import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {ContactRequest} from '../models/contact-request.model';
import {AuthService} from './auth.service';
import {toPromise} from 'rxjs/operator/toPromise';
import {ServiceUtils} from '../service-utils';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  getUsers(): Promise<User[]> {
    return this.http.get(`${environment.apiUrl}/users`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        return response['_embedded']['users'] as User[];
      });
  }

  getUser(userId: number): Promise<User> {
    return this.http.get(`${environment.apiUrl}/users/${userId}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        return response as User;
      });
  }

  getContacts(): Promise<User[]> {
    return this.http.get(`${environment.apiUrl}/users/${this.authService.getUserId()}/contacts`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        return response['_embedded']['users'] as User[];
      });
  }

  sendContactRequest(user: User): Promise<Object> {
    const body: Object = {
      receiver: `${environment.apiUrl}/users/${user.id}`,
      sender: `${environment.apiUrl}/users/${this.authService.getUserId()}`
    };

    return this.http.post(`${environment.apiUrl}/contactRequests`, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  getContactRequests(): Promise<ContactRequest[]> {
    return this.http.get(
      `${environment.apiUrl}/contactRequests/search/findAllByReceiverUsername?` +
    `receiverName=${this.authService.getCurrentUser().username}&projection=contactRequestProjection`)
      .toPromise()
      .then(response => {
        const contactRequests: ContactRequest[] = response['_embedded']['contactRequests'] as ContactRequest[];
        contactRequests.forEach(contactRequest => {
          contactRequest.id = ServiceUtils.getId(contactRequest);
        });

        return contactRequests;
      });
  }

  getContactRequest(username: string): Promise<Object> {
    return this.http.get(
      `${environment.apiUrl}/contactRequests/search/findBySenderUsernameAndReceiverUsername?` +
      `senderName=${this.authService.getCurrentUser().username}&receiverName=${username}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  deleteContactRequest(contactRequest: ContactRequest): Promise<Object> {
    return this.http.delete(`${environment.apiUrl}/contactRequests/${contactRequest.id}`).toPromise()
      .then(response => {
        return response;
      });
  }

  addContact(userId: number): Promise<void> {
    const body = `${environment.apiUrl}/users/${userId}`;

    return this.http.post(`${environment.apiUrl}/users/${this.authService.getUserId()}/contacts`, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/uri-list')
    })
      .toPromise()
      .then(response => {
        console.log(response);
      });
  }

  removeContact(userId: number): Promise<Object> {
    return this.http.delete(`${environment.apiUrl}/users/${this.authService.getUserId()}/contacts/${userId}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        return response;
      });
  }
}
