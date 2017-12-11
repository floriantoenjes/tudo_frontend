import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(username: String, password: String): Promise<HttpResponse<Object>> {

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
        const jwt = response.headers.get('Authorization');

        console.log(jwt);
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedJWT = JSON.parse(window.atob(base64));

        console.log(decodedJWT);

        this.setToken(jwt);
        return response;
      });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

}
