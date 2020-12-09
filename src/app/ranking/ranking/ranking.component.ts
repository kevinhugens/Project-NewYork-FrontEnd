import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from '../../shared/services/ranking.service';
import { Ranking } from '../../shared/models/ranking.model';
import { TeamService } from '../../shared/services/team.service';
import { Team } from '../../shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Competition } from 'src/app/shared/models/competition.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  rankings: Ranking[]=[];
  rankLength: number;
  teams: Team[];
  activeUser: User;
  userTeam: Team;
  userCompetition: Competition;

  constructor(private router: Router, private _rankingService: RankingService, private _teamService: TeamService, private _authanticateService: AuthenticateService, private _competitionService: CompetitionService) {
    // this._rankingService.getRankings().subscribe(result => {
    //   this.rankings = result;
    //   this.rankings.sort((a, b) => b.points - a.points);
    //   this.rankLength = this.rankings.length;
    //   for (let i = 0; i < this.rankLength; i++) {

    //     this.rankings[i]["rank"] = i + 1;
    //   }
    // });
    this._teamService.getTeams().subscribe(result => {
      this.teams = result;
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  navigate() {
    this.router.navigate(['/routepath']);
  }

  teamMatches(id: number) {
    this.router.navigate(['teamGames/' + id]);
  }

  getUserData() {
    this._authanticateService.loggedUser.subscribe(result => {
      this.activeUser = result;
      this._teamService.getTeam(result.teamID).subscribe(result => {
        this.userTeam = result;
        this.getCompetition();
      })
    });
  }

  getCompetition() {
    this._rankingService.getRankings().subscribe(result => {
      result.map(res => {
        if (res.teamID == this.userTeam.teamID) {
          this._competitionService.getCompetition(res.competitionID).subscribe(competition => {
            this.userCompetition = competition;
            this.getRanking()
          });
        }
      })
    });

  }

  getRanking() {
    this._rankingService.getRankings().subscribe(result => {
      result.map(res => {
        if (res.competitionID == this.userCompetition.competitionID) {
          this.rankings.push(res);
          this.rankings.sort((a, b) => b.points - a.points);
          this.rankLength = this.rankings.length;
          for (let i = 0; i < this.rankLength; i++) {
            this.rankings[i]["rank"] = i + 1;
          }
        }
      });
    });
  }

}
