import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  submitted = false;

  dateOfBirth = new Date();
  maxDate = new Date();
  maxdate = this.maxDate.setFullYear(this.maxDate.getFullYear() - 5); // User must be min 5 years old
  minDate = new Date();
  mindate = this.minDate.setFullYear(this.minDate.getFullYear() - 100); // User can be max 100 years old

  // user: User = new User(0, '', '', '', '', null, this.dateOfBirth, '', null, 'User');

  signupForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required,Validators.minLength(2)]],
    dateOfBirth: ['', [Validators.required,Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required,Validators.minLength(2)]],
    team: [],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("User want's to create an account");
    console.log(this.signupForm.value);

  }

}
