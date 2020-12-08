import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../shared/models/user.model';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  lijstUsers: User[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.lijstUsers = [];
    this.lijstUsers.push(new User(1,"Kevin","Hugens","kevin@testing.be","abc123",new Date("06-06-1997"),"kevin.jpg",null,"user"));
    this.lijstUsers.push(new User(2,"Iebe","Maes","iebe@testing.be","abc123",new Date("05-05-2000"),"iebe.jpg",null,"user"));
    this.lijstUsers.push(new User(3,"Arno","Vangoetsenhoven","arno@testing.be","abc123",new Date("04-04-2000"),"arno.jpg",null,"user"));
    this.lijstUsers.push(new User(4,"Wouter","Vanaelten","wouter@testing.be","abc123",new Date("02-02-2000"),"wouter.jpg",null,"user"));
  }
  onAdd(){
    //this.lijstUsers.push(new User(0,"Test","User","test@testing.be","abc123",new Date("01-01-2000"),"test.jpg",null,"user"));
    this.router.navigate(["/adduser"]);
  }
  onEdit(user : User){
    //user.lastName = "Testing";
    var result = this.lijstUsers.find(x=>x.userID == user.userID)
    result.lastName = "Testing";
    //this.api.selecteduser = user;
    this.router.navigate(["/edituser"]);
  }
  onDelete(user){
    let index = this.lijstUsers.indexOf(user);
    this.lijstUsers.splice(index,1);
  }

}
