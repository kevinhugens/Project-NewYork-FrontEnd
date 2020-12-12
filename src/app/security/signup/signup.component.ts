import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/shared/models/user-login.model';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { AuthenticateService } from '../services/authenticate.service';
import {
  DropzoneComponent,
  DropzoneDirective,
  DropzoneConfigInterface,
  DropzoneUrlFunction
} from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild(DropzoneComponent, { static: false })

  componentRef?: DropzoneComponent;
  dropzone: any;
  newFilename: string;

  public config: DropzoneConfigInterface = {
    url: "https://newyork-backend.azurewebsites.net/api/upload",
    acceptedFiles: "image/*",
    autoProcessQueue: false,
    maxFiles: 1    
  }

  processQueue(): void {
    this.dropzone = this.componentRef.directiveRef.dropzone();
    if (this.dropzone.files.length !== 0) {
      this.newFilename = this.dropzone.files[0].name;
      this.dropzone.processQueue();
    } else {
      this.newFilename = null;
      throw new Error("No file selected");
    }
  }

  onUploadError(event): void {
    throw new Error(event[0].upload.filename + ": " + event[1].message);
  }


  removeFiles(): void {
    console.log("User removed his image");
    this.dropzone = this.componentRef.directiveRef.dropzone();
    this.dropzone.removeAllFiles(true);
  }

  // newUser: User = new User(0, "", "", "", "", "", null, null, null, "");
  newUser: User;

  maxDate = new Date();
  minDate = new Date();


  submitted: boolean = false;

  // Not possible to select sundays
  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   // Prevent Sunday from being selected.
  //   return day !== 0;
  // }

  constructor(private router: Router, private _userService: UserService, private _authenticateService: AuthenticateService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 10);
    this.minDate.setFullYear(this.minDate.getFullYear() - 100);
    console.log("Mindate", this.minDate);
    console.log("MaxDate", this.maxDate);
    this.newUser = new User(0, "", "", "", "", null, this.maxDate, this.newFilename, null, "user", null);
  }

  onSubmit() {
    console.log("User wants to sign up:", this.newUser);
    this.submitted = true;
    this.newUser.photo = this.newFilename;
    this.processQueue();
    this._userService.addUser(this.newUser).subscribe(
      result => {
        // Login & navigate to home
        if (result) {
          // Log the user in
          console.log("Log the user in:", result.email, this.newUser.password);
          this._authenticateService.authenticate(new UserLogin(result.email, this.newUser.password)).subscribe(
            result => {
              // Save in localStorage before setting the user as logged in!
              localStorage.setItem("token", result.token);
              localStorage.setItem("currentUser", JSON.stringify(result));
              this._authenticateService.logUser(result);
              this._authenticateService.isLoggedin.next(result.token ? true : false);
              this.snackBar.open("Welkom " + result.firstName + " " + result.lastName + "!", "", { duration: 5000 });
              this.router.navigate(['']); // Navigate to homepage
            },
            error => {
              console.log(error);
              this.snackBar.open("Aanmelden niet gelukt!", "", { duration: 5000 });
              this.submitted = false;
            }
          );
        } else {
          this.snackBar.open("Aanmelden niet gelukt!", "", { duration: 5000 });
          this.submitted = false;
        }
      }
    );

  }


}
