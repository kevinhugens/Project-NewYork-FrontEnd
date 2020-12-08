import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/shared/models/team.model';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-teams-add',
  templateUrl: './teams-add.component.html',
  styleUrls: ['./teams-add.component.scss']
})
export class TeamsAddComponent implements OnInit {
  newTeam : Team = new Team(0,"","","","",0);
  submittedNew : boolean = false;
  constructor(private router: Router, private api : TeamService) { }

  ngOnInit(): void {
  }

  backToTeams() {
    this.router.navigate(["/teams"]);
  }

  onSubmitCreateTeam() {
    this.submittedNew = true;
    this.api.addTeam(this.newTeam).subscribe(() => {
      this.submittedNew = false;
    });
    this.newTeam = new Team(0,"","","","",0);
  }


}
