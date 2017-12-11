import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(username: String, password: String): Object {

    return this.http.post('http://127.0.0.1:8080/api/v1/login', {
      'username': username,
      'password': password
    }, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        return response;
      });
  }

}
