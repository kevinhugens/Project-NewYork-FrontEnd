import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("User want's to create an account");
  }

}
