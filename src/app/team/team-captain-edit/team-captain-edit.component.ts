import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-team-captain-edit',
  templateUrl: './team-captain-edit.component.html',
  styleUrls: ['./team-captain-edit.component.scss']
})
export class TeamCaptainEditComponent implements OnInit {
  team : Team;
  selectedCaptain : User;
  submitted : boolean = false;
  lijstUsersTeam : User[];
  constructor(private router: Router, private api : TeamService, private userApi : UserService) { }

  ngOnInit(): void {
    this.team = this.api.selectedTeam;
    this.userApi.getUsersByTeamID(this.team.teamID).subscribe((result) => {
      this.lijstUsersTeam = result;
    });
  }

  backToTeams() {
    this.router.navigate(["/teams"]);
  }

  onSubmitUpdateTeam() {
    this.submitted = true;
    this.api.updateTeam(this.team.teamID,this.team).subscribe(() => {
      this.router.navigate(["/teams"]);
    });
  }

}
