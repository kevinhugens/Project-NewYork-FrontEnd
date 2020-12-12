import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/shared/services/upload.service';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../shared/services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  lijstUsers: User[];
  constructor(private router: Router, private api : UserService, private snackBar: MatSnackBar,private apiUpload : UploadService) { }

  ngOnInit(): void {
    this.updateList();
  }

  onAdd(){
    this.router.navigate(["/adduser"]);
  }

  onEdit(user : User){
    if(user){
      this.api.selectedUser = user;
      this.router.navigate(["/edituser"]);
    } else {
      this.snackBar.open("Please select a user.", "", { duration: 5000 });
    }
  }

  onDelete(user : User){
    if(user){
      this.apiUpload.deletePhoto(user.photo).subscribe();
      this.api.deleteUser(user.userID).subscribe(() => {
        this.updateList();
      })
    } else {
      this.snackBar.open("Please select a user.", "", { duration: 5000 });
    }
  }

  updateList() {
    this.api.getUsers().subscribe((result) => {
      this.lijstUsers = result;
      for (let index = 0; index < this.lijstUsers.length; index++) {
        const element = this.lijstUsers[index];
        this.apiUpload.getPhoto(element.photo).subscribe((result) => {
          element["linkfoto"] = result;
        })
      }
    });
  }
}
