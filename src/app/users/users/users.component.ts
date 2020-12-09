import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../shared/models/user.model';
import {UserService} from '../../shared/services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  lijstUsers: User[];
  constructor(private router: Router, private api : UserService) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe((result) => this.lijstUsers = result);
  }
  onAdd(){
    this.router.navigate(["/adduser"]);
  }
  onEdit(user : User){
    this.api.selectedUser = user;
    this.router.navigate(["/edituser"]);
  }
  onDelete(user){
    let index = this.lijstUsers.indexOf(user);
    this.lijstUsers.splice(index,1);
  }

}
