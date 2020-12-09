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
  constructor(private router: Router, private apiTeams : TeamService, private apiUsers : UserService) { }

  ngOnInit(): void {
    this.selectedTeam = this.apiTeams.selectedTeam;
    this.apiUsers.getUsersByTeamID(this.selectedTeam.teamID).subscribe((result) => {
      this.usersByTeamID = result;
      console.log(this.usersByTeamID);
    });
  }

  backToTeams() {
    this.router.navigate(["/teams"]);
  }

  onSubmitUpdateTeam() {
    this.submittedSelected = true;
    this.apiTeams.updateTeam(this.selectedTeam.teamID,this.selectedTeam).subscribe(() => {
      this.router.navigate(["/teams"]);
    });
  }

}
