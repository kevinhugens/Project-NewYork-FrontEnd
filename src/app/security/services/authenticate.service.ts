import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserLogin } from '../../shared/models/user-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private userLogged = new BehaviorSubject(this.getCurrentUser());
  loggedUser = this.userLogged.asObservable();

  logUser(user : User){
    this.userLogged.next(user);
  }

  isLoggedin = new BehaviorSubject(false);

  isLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }
  getCurrentUser() {
    if(localStorage.getItem("currentUser")){
      return JSON.parse(localStorage.getItem("currentUser"));
    }
    else {
      return null;
    }
  }

  user = new BehaviorSubject(String);

  // ifUser() {
  //   if (localStorage.getItem("userRole")) {
  //     return localStorage.getItem("userRole");
  //   } else {
  //     return false;
  //   }
  // }

  constructor(private _httpClient: HttpClient) { }

  authenticate(userLogin: UserLogin): Observable<User> {
    return this._httpClient.post<User>("https://localhost:44300/api/User/authenticate", userLogin);
  }

}