import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.scss']
})
export class TeamsEditComponent implements OnInit {
  selectedTeam : Team;
  submittedSelected : boolean = false;
  usersByTeamID : User[];
  usersZonderTeam: User[];
  selectedUser : User;

  constructor(private router: Router, private apiTeams : TeamService, private apiUsers : UserService) { }

  ngOnInit(): void {
    this.selectedTeam = this.apiTeams.selectedTeam;
    this.apiUsers.getUsersByTeamID(this.selectedTeam.teamID).subscribe((result) => {
      this.usersByTeamID = result;
      if(result.length == 0){
        this.getAllUsersWithoutTeam();
      }
    });
  }

  backToTeams() {
    this.router.navigate(["/teams"]);
  }

  onSubmitUpdateTeam() {
    if(this.selectedUser){
      this.selectedTeam.captainID = this.selectedUser.userID;
      this.selectedUser.teamID = this.selectedTeam.teamID;
      this.apiUsers.updateUser(this.selectedUser.userID,this.selectedUser).subscribe();
    }
    this.submittedSelected = true;
    this.apiTeams.updateTeam(this.selectedTeam.teamID,this.selectedTeam).subscribe(() => {
      this.router.navigate(["/teams"]);
    });
    
  }

  getAllUsersWithoutTeam(){
    this.apiUsers.getUsersWithoutTeam().subscribe((result) => {
      result.splice(result.indexOf(result.find(x=>x.email == "admin@admin.be")),1);
      this.usersZonderTeam = result;
    })
  }

}
