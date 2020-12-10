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
      
      if (this._authenticateService.isLoggedIn()) {
        this._authenticateService.loggedUser.subscribe(
          result => {
            if (result.role == "admin") {
              return true;
            }else{
              this.router.navigate(['/geen-toegang']);
              return false;
            }
          });
      } else{
        this.router.navigate(['/aanmelden']); // Redirect user to home page if he is not authenticated
        return false;
      }


  }

}
