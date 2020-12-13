import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _authenticateService: AuthenticateService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem("currentUser")){
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if(user.role == "admin"){
          //console.log("User is an admin");
          return true;
        }else{
          //console.log("User is no admin");
          this.router.navigate(['/geen-toegang']);
          return false;
        }
      }else{
        //console.log("User is not authenticated");
        this.router.navigate(['/aanmelden']);
        return false;
      }
  }
  
}
