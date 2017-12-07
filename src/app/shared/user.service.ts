import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.model';

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

        users.forEach(user => {
          const selfLink: String = user['_links']['self']['href'];
          user.id = Number(selfLink.substr(selfLink.length - 1, 1));
        });

        return response['_embedded']['users'] as User[];
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
}
