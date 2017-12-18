import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from './user.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(username: String, password: String): Promise<void> {

    return this.http.post('http://localhost:8080/api/v1/login', {
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
        this.setToken(jwt);
      });
  }

  signOut(): void {
    localStorage.removeItem('token');
  }

  signUp(user: User): Promise<User> {
    return this.http.post('http://localhost:8080/api/v1/users', user, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    })
      .toPromise()
      .then(response => {
        return response as User;
      });
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  decodeJWT(token: string): Object {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const decodedToken: Object = this.decodeJWT(this.getToken());
      const currentUser: User = new User();

      currentUser.id = decodedToken['jti'];
      currentUser.username = decodedToken['sub'];

      return currentUser;
    }
  }

  getUserId(): Number {
    return this.getCurrentUser().id;
  }

}
