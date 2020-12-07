import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticateService } from '../security/services/authenticate.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn = false;

  constructor(private router: Router, private snackBar: MatSnackBar, private _authenticateService: AuthenticateService) {
    this._authenticateService.isLoggedin.subscribe(e => {
      this.loggedIn = this._authenticateService.isLoggedIn();
    })
  }

  ngOnInit(): void {
  }

  logout() {
    console.log("User wants to logout");
    localStorage.clear();
    this._authenticateService.isLoggedin.next(false);
    this.snackBar.open("Tot later ...!", "", { duration: 5000 });
    // this._authenticateService.isLoggedin.next(false);
    this.router.navigate(['aanmelden']); // Redirect to login page after logout
  }

}
