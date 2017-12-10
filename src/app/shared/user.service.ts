import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.model';
import {ContactRequest} from './contact-request.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Promise<User[]> {
    return this.http.get('http://localhost:8080/api/v1/users', {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        const users: User[] = response['_embedded']['users'];

        // users.forEach(user => {
        //   user.id = this.getId(user);
        // });

        return users;
      });
  }

  getUser(userId: Number): Promise<User> {
    return this.http.get(`http://localhost:8080/api/v1/users/${userId}`, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .toPromise()
      .then(response => {
        return response as User;
      });
  }

  getContacts(): Promise<User[]> {
    return this.http.get('http://localhost:8080/api/v1/users/1/contacts', {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
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
      sender: 'http://localhost:8080/api/v1/users/1'
    };

    return this.http.post('http://localhost:8080/api/v1/contactRequests', body, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  getContactRequests(): Promise<ContactRequest[]> {
    return this.http.get(
      'http://localhost:8080/api/v1/contactRequests/search/findAllByReceiverId?receiverId=1&projection=contactRequestProjection', {
        headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
      })
      .toPromise()
      .then(response => {
        return response as ContactRequest[];
      });
  }

  getContactRequest(userId: Number): Promise<Object> {
    return this.http.get(
      `http://localhost:8080/api/v1/contactRequests/search/findBySenderIdAndReceiverId?senderId=1&receiverId=${userId}`, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
    })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  removeContact(userId: Number): Promise<Object> {
    return this.http.delete(`http://localhost:8080/api/v1/users/1/contacts/${userId}`, {
      headers: new HttpHeaders().set('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  // ToDo: Extract into utilities class
  getId(restEntity: Object): Number {
    const selfLink = restEntity['_links']['self']['href'];
    const splitted = selfLink.split('/');
    if (splitted[splitted.length - 1] === '') {
      return Number(splitted[splitted.length - 2]);
    } else {
      return Number(splitted[splitted.length - 1]);
    }
  }
}
