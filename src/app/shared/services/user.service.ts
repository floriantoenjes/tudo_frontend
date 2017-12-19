import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {ContactRequest} from '../models/contact-request.model';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getUsers(): Promise<User[]> {
    return this.http.get('http://localhost:8080/api/v1/users', {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        return response['_embedded']['users'] as User[];
      });
  }

  getUser(userId: number): Promise<User> {
    return this.http.get(`http://localhost:8080/api/v1/users/${userId}`, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        return response as User;
      });
  }

  getContacts(): Promise<User[]> {
    return this.http.get(`http://localhost:8080/api/v1/users/${this.authService.getUserId()}/contacts`, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        return response['_embedded']['users'] as User[];
      });
  }

  sendContactRequest(user: User): Promise<Object> {
    const body: Object = {
      receiver: `http://localhost:8080/api/v1/users/${user.id}`,
      sender: `http://localhost:8080/api/v1/users/${this.authService.getUserId()}`
    };

    return this.http.post('http://localhost:8080/api/v1/contactRequests', body, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  getContactRequests(): Promise<ContactRequest[]> {
    return this.http.get(
      `http://localhost:8080/api/v1/contactRequests/search/findAllByReceiverUsername?` +
    `receiverName=${this.authService.getCurrentUser().username}&projection=contactRequestProjection`, {
        headers: new HttpHeaders()
          .set('Authorization', this.authService.getToken())
      })
      .toPromise()
      .then(response => {
        return response['_embedded']['contactRequests'] as ContactRequest[];
      });
  }

  getContactRequest(username: string): Promise<Object> {
    return this.http.get(
      `http://localhost:8080/api/v1/contactRequests/search/findBySenderUsernameAndReceiverUsername?` +
      `senderName=${this.authService.getCurrentUser().username}&receiverName=${username}`, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
    })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  addContact(userId: number): Promise<void> {
    const body: String = `http://localhost:8080/api/v1/users/${userId}`;

    return this.http.post(`http://localhost:8080/api/v1/users/${this.authService.getUserId()}/contacts`, body, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'text/uri-list')
    })
      .toPromise()
      .then(response => {
        console.log(response);
      });
  }

  removeContact(userId: number): Promise<Object> {
    return this.http.delete(`http://localhost:8080/api/v1/users/${this.authService.getUserId()}/contacts/${userId}`, {
      headers: new HttpHeaders()
        .set('Authorization', this.authService.getToken())
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        return response;
      });
  }
}
