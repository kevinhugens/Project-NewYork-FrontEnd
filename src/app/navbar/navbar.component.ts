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
      //console.log("IS logged in?");
      this.loggedIn = this._authenticateService.isLoggedIn();
    })
    this._authenticateService.loggedUser.subscribe(
      result => {
        this.currentUser = result;
        //console.log('Get current user');
      }
    )
  }

  ngOnInit(): void {
  }

  logout() {
    //console.log("User wants to logout");
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
