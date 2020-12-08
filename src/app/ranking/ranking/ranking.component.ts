import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from '../ranking.service';
import { Ranking } from '../../shared/models/ranking.model';
import { Team } from '../../shared/models/team.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  rankings: Ranking[];
  rankLength: number;
  teams: Team[];

  constructor(private router: Router, private _rankingService: RankingService) {
    this._rankingService.getRankings().subscribe(result => {
      this.rankings = result;
      this.rankings.sort((a, b) => b.points - a.points);
      this.rankLength = this.rankings.length; 
      for (let i = 0; i < this.rankLength; i++) {
        console.log(this.rankings[i])
        this.rankings[i]["rank"] = i+1;
      }
    });
    this._rankingService.getTeams().subscribe(result=>{
      this.teams = result;
    });
  }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigate(['/routepath']);
  }

  teamMatches(id: number){
    this.router.navigate(['teamGames/' + id]);
  }

}
