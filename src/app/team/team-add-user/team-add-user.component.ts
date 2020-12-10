import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { User } from 'src/app/shared/models/user.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-team-add-user',
  templateUrl: './team-add-user.component.html',
  styleUrls: ['./team-add-user.component.scss']
})
export class TeamAddUserComponent implements OnInit {
  activeUser : User;
  lijstUsers : User[];
  selectedUser : User;
  constructor(private router: Router, private authApi : AuthenticateService, private userApi : UserService) { }

  ngOnInit(): void {
    this.authApi.loggedUser.subscribe((result) => {
      this.activeUser = result;
      this.getAllUsersWithoutTeam();
    })
  }
  getAllUsersWithoutTeam(){
    this.userApi.getUsersWithoutTeam().subscribe((result) => {
      result.splice(result.indexOf(result.find(x=>x.email == "admin@admin.be")),1);
      this.lijstUsers = result;
    })
  }
  onAddUser() {
    this.selectedUser.teamID = this.activeUser.teamID;
    this.userApi.updateUser(this.selectedUser.userID,this.selectedUser).subscribe(() => {
      this.router.navigate(["/teams"]);
    });
  }

  backToTeams() {
    this.router.navigate(["/teams"]);
  }

}
