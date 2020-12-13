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
    this._authenticateService.isLoggedin.subscribe(e => {
      console.log("User is authenticated:", e);
      this.loggedIn = e;
      if(e){
        // If the user is logged in, get the data of the current user
        this._authenticateService.loggedUser.subscribe(
          result => {
            console.log('User is authenticated, get the current user');
            this.currentUser = result;
          }
        )
      }
    })

  }

  ngOnInit(): void {
  }

  logout() {
    console.log("User wants to logout");
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
