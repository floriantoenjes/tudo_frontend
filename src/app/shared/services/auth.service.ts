import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {
  isUserSignedIn: Subject<boolean> = new Subject<boolean>();

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
        this.isUserSignedIn.next(true);
      });
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.isUserSignedIn.next(false);
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

  isSignedIn(): boolean {
    return this.getToken() !== null;
  }

  getCurrentUser(): User {
    if (this.isSignedIn()) {
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
