import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logout() {
    console.log("User wants to logout");
    alert("Logout")
    localStorage.clear();
    this.snackBar.open("Tot later ...!", "", { duration: 5000 });
    // this._authenticateService.isLoggedin.next(false);
    this.router.navigate(['aanmelden']); // Redirect to login page after logout
  }


}
