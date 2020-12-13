import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticateService } from '../security/services/authenticate.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  loggedIn = false;
  currentUser: User;

  constructor(private router: Router, private snackBar: MatSnackBar, private _authenticateService: AuthenticateService) {


  }

  ngOnInit(): void {
    this._authenticateService.loggedUser.subscribe(
      result => {
        this.loggedIn = this._authenticateService.isLoggedIn();
        if(this.loggedIn){
          console.log('User is authenticated, get the current user');
        }
        this.currentUser = result;

      }
    );
  }

  logout() {
    //console.log("User wants to logout");
    this.loggedIn = false;
    localStorage.clear();
    this._authenticateService.isLoggedin.next(false);
    this.snackBar.open("Tot later " + this.currentUser.firstName + " " + this.currentUser.lastName + "!", "", { duration: 5000 });
    // this._authenticateService.isLoggedin.next(false);
    this.router.navigate(['aanmelden']); // Redirect to login page after logout
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }


}
