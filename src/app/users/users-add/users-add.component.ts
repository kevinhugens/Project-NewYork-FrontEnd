import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {
  newUser : User = new User(0,"","","","","",new Date,"",0,"");
  submittedNew : boolean = false;
  constructor(private router : Router, private api : UserService) { }

  ngOnInit(): void {
  }

  backToUsers(){
    this.router.navigate(["/users"]);
  }
  onSubmitCreateUser() {
    this.submittedNew = true;
    this.api.addUser(this.newUser).subscribe(() => {
      this.submittedNew = false;
    });
    this.newUser = new User(0,"","","","","",new Date,"",0,"");
    console.log(this.newUser);
  }

}
