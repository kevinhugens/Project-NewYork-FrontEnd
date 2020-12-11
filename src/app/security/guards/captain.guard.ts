import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class CaptainGuard implements CanActivate {
  captain: boolean;
  currentUser: User;
  constructor(private _authService: AuthenticateService, private router: Router, private _teamService: TeamService) {
    // console.log("Constructor");
    // this.captain = this._authService.checkIfCaptain2();
    // console.log("Constructor captain:", this.captain);
    // console.log("Constructor captain:", this._authService.checkIfCaptain2());

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("CAPTAAAAAAAAAIN", this.captain);

    if (localStorage.getItem('currentUser')) {
      console.log("User is authenticated - auth");
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (this.currentUser.teamID != null) {
        console.log("User has an team - auth", this.currentUser.teamID);
        // Get the team
        this._teamService.getTeam(this.currentUser.teamID).subscribe(
          result => {
            console.log("RESULT:", result);
            if (result) {
              console.log("Team is found");
              if (this.currentUser.userID == result.captainID) {
                console.log("The user is an captain - auth");
                console.log("Return facking trueeeeeee")
                return true;
              } else {
                console.log("The user is no captain - auth");
                return false;
              }
            } else {
              console.log("No team found - auth");
              return false;
            }

          }
        );

      } else {
        console.log("User has no team - auth")
        return false;
      }

    } else {
      console.log("User isn't authenticated - auth");
      return false;
    }




  }

  nogOnInit(): void {
    console.log("NogOnInit");
    this.captain = this._authService.checkIfCaptain2();

  }

}
