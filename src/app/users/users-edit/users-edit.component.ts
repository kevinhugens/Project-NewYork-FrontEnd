import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  selectedUser : User = new User(0,"","","","",new Date,"",0,"");
  submittedSelected : boolean = false;
  constructor(private router : Router) { }

  ngOnInit(): void {
    //this.selectedUser = this.api.selectedUser;
  }
  backToUsers() {
    this.router.navigate(["/users"]);
  }
  onSubmitUpdateUser(){
    this.submittedSelected = true;
    console.log(this.selectedUser);
    this.router.navigate(["/users"]);
    
    this.submittedSelected = false;
  }

}
