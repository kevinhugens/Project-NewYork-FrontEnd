import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from 'src/app/shared/models/competition.model';
import { Ranking } from 'src/app/shared/models/ranking.model';
import { Team } from 'src/app/shared/models/team.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';
import { RankingService } from 'src/app/shared/services/ranking.service';
import { TeamService } from 'src/app/shared/services/team.service';


@Component({
  selector: 'app-admin-ranking',
  templateUrl: './admin-ranking.component.html',
  styleUrls: ['./admin-ranking.component.scss']
})
export class AdminRankingComponent implements OnInit {
  rankings: Ranking[] = [];
  teams: Team[];
  rankLength: number;
  competition: Competition;

  id = this.route.snapshot.params['id'];
  constructor(private router: Router, private _rankingService: RankingService, private _teamService: TeamService, private route: ActivatedRoute, private _competitionService: CompetitionService) {
    this._rankingService.getRankings().subscribe(result => {
      result.map(res => {
        if (res.competitionID == this.id) {
          this.rankings.push(res);
          this.rankings.sort((a, b) => b.points - a.points);
          this.rankLength = this.rankings.length;
          for (let i = 0; i < this.rankLength; i++) {
            this.rankings[i]["rank"] = i + 1;
          }
        }
      });
    });
    this._teamService.getTeams().subscribe(result => {
      this.teams = result;
    });
    this._competitionService.getCompetition(this.id).subscribe(result=>{
      this.competition = result;
    });
  }

  ngOnInit(): void {
  }

  onAdd(competition: Competition) {
    this._rankingService.selectedCompetion = competition;
    this.router.navigate(['addTeam']);
  }
}
