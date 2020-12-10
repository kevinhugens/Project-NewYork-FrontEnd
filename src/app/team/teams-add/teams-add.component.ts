import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-teams-add',
  templateUrl: './teams-add.component.html',
  styleUrls: ['./teams-add.component.scss']
})
export class TeamsAddComponent implements OnInit {
  newTeam : Team = new Team(0,"","","","",null);
  lijstUsers : User[];
  selectedUser : User;
  submittedNew : boolean = false;
  constructor(private router: Router, private api : TeamService, private apiUsers : UserService) { }

  ngOnInit(): void {
    this.getAllUsersWithoutTeam();
  }

  backToTeams() {
    this.router.navigate(["/teams"]);
  }

  getAllUsersWithoutTeam(){
    this.apiUsers.getUsersWithoutTeam().subscribe((result) => {
      result.splice(result.indexOf(result.find(x=>x.email == "admin@admin.be")),1);
      this.lijstUsers = result;
    })
  }

  onSubmitCreateTeam() {
    this.submittedNew = true;
    if(this.selectedUser){
      this.newTeam.captainID = this.selectedUser.userID;
      
    } else  {
      this.newTeam.captainID = null;
    }
    
    this.api.addTeam(this.newTeam).subscribe((result) => {
      this.submittedNew = false;
      if(this.selectedUser){
        this.selectedUser.teamID = result.teamID;
        this.apiUsers.updateUser(this.selectedUser.userID,this.selectedUser).subscribe();
      }
    });
    this.newTeam = new Team(0,"","","","",0);
  }


}
