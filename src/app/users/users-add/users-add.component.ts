import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {
  newUser : User = new User(0,"","","","",new Date,"",0,"");
  submittedNew : boolean = false;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  backToUsers(){
    this.router.navigate(["/users"]);
  }
  onSubmitCreateUser() {
    console.log(this.newUser);
  }

}
