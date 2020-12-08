import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  lijstTeams : Team[] = [];
  activeUser : User;
  team : Team;
  constructor(private router: Router, private api : TeamService, private authApi : AuthenticateService) { }

  ngOnInit(): void {
    this.api.getTeams().subscribe((result) => {
      this.lijstTeams = result;
    });
    this.authApi.loggedUser.subscribe((result) => {
      this.activeUser = result;
      if(result.teamID!= null){
        this.api.getTeam(this.activeUser.teamID).subscribe((result) => this.team = result);
        console.log(this.team);
      }
    });
  }
  onAdd(){
    console.log(this.activeUser);
    this.router.navigate(["/teamsadd"]);
  }
  onEdit(team : Team){
    this.api.selectedTeam = team;
    this.router.navigate(["/teamsedit"]);
  }
  onDelete(team : Team){
    this.api.deleteTeam(team.teamID).subscribe(() => {
      this.api.getTeams().subscribe((result)=>this.lijstTeams = result);
    })
  }

}
