import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserLogin } from '../../shared/models/user-login.model';
import { TeamService } from 'src/app/shared/services/team.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private userLogged = new BehaviorSubject(this.getCurrentUser());
  loggedUser = this.userLogged.asObservable();
  currentUser: User;

  logUser(user: User) {
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
    if (localStorage.getItem("currentUser")) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      return JSON.parse(localStorage.getItem("currentUser"));
    }
    else {
      return null;
    }
  }


  checkIfCaptain2() {

    if (localStorage.getItem('currentUser')) {
      //console.log("User is authenticated - auth");
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (this.currentUser.teamID != null) {
        //console.log("User has an team - auth", this.currentUser.teamID);
        // Get the team
        this._teamService.getTeam(this.currentUser.teamID).subscribe(
          result => {
            //console.log("RESULT:", result);
            if (result) {
              //console.log("Team is found");
              if (this.currentUser.userID == result.captainID) {
                //console.log("The user is an captain - auth");
                return true;
              } else {
                //console.log("The user is no captain - auth");
                return false;
              }
            } else {
              //console.log("No team found - auth");
              return false;
            }

          }
        );

        // return false;

      } else {
        //console.log("User has no team - auth")
        return false;
      }

    } else {
      //console.log("User isn't authenticated - auth");
      return false;
    }


  }


  user = new BehaviorSubject(String);

  constructor(private _httpClient: HttpClient, private _teamService: TeamService) { }

  authenticate(userLogin: UserLogin): Observable<User> {
    //console.log("Authenticate");
    return this._httpClient.post<User>("https://newyork-backend.azurewebsites.net/api/User/authenticate", userLogin);
  }

}