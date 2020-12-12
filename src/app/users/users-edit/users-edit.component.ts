import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  selectedUser : User;
  submittedSelected : boolean = false;
  profilepic : string;
  constructor(private router : Router, private api : UserService, private apiUpload : UploadService) { }

  ngOnInit(): void {
    this.selectedUser = this.api.selectedUser;
    this.apiUpload.getPhoto(this.selectedUser.photo).subscribe((result) => {
      this.profilepic = result;
    })
  }
  backToUsers() {
    this.router.navigate(["/users"]);
  }
  onSubmitUpdateUser(){
    this.submittedSelected = true;
    this.api.updateUser(this.selectedUser.userID,this.selectedUser).subscribe(() => {
      this.router.navigate(["/users"]);
    })
  }

}
