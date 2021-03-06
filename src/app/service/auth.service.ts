import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {EventEmitter} from 'events';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../model/user-token';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  update = new EventEmitter<string>();
  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  // tslint:disable-next-line:typedef
  login(inputUser: User) {
    return this.http.post(API_URL + '/login', inputUser)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.update.emit('login');
        return user;
      }));
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/signup', user);
  }
}
