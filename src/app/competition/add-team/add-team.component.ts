import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ranking } from 'src/app/shared/models/ranking.model';
import { Team } from 'src/app/shared/models/team.model';
import { RankingService } from 'src/app/shared/services/ranking.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  teams: Team[] = [];
  ranking: Ranking = new Ranking(0, 0, 0, 0);
  teamIDs: number[] = [];

  constructor(private router: Router, private _rankingService: RankingService, private _teamService: TeamService, private dialogRef: MatDialogRef<AddTeamComponent>) {
    this._rankingService.getRankings().subscribe(result => {
      result.map(res => {
        this.teamIDs.push(res.teamID);
      });
      this.getTeams();
    });

    this.ranking.competitionID = this._rankingService.selectedCompetion.competitionID;
  }

  ngOnInit(): void {
  }

  onSubmitCreateRanking() {
    this._rankingService.addRanking(this.ranking).subscribe(() => {
      this.dialogRef.close(this.ranking);
    });
  }

  getTeams() {
    this._teamService.getTeams().subscribe(result => {
      result.map(res => {
        if (this.teamIDs.includes(res.teamID) == false) {
          this.teams.push(res);
        }
      })
    });
  }

}
