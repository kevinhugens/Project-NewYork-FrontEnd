import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from 'src/app/shared/models/competition.model';
import { Game } from 'src/app/shared/models/game.model';
import { Ranking } from 'src/app/shared/models/ranking.model';
import { Team } from 'src/app/shared/models/team.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';
import { GameService } from 'src/app/shared/services/game.service';
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
  teams2: Team[]=[];
  rankLength: number;
  competition: Competition;
  game: Game = new Game(0, "1v1", 0,0,new Date(), null, null, null, 1, 1);
  games: Game[];
  teamIDs: number[] = [];

  id = this.route.snapshot.params['id'];
  constructor(private router: Router, private _rankingService: RankingService, private _teamService: TeamService, private route: ActivatedRoute,
    private _competitionService: CompetitionService, private _gameService: GameService) {
    this._rankingService.getRankings().subscribe(result => {
      result.map(res => {
        this.teamIDs.push(res.teamID);
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

    this._competitionService.getCompetition(this.id).subscribe(result => {
      this.competition = result;
    });
    this._gameService.getGames().subscribe(result=>{
      this.games = result;
    })
  }

  ngOnInit(): void {
    this.getTeams();
  }

  onAdd(competition: Competition) {
    this._rankingService.selectedCompetion = competition;
    this.router.navigate(['addTeam']);
  }

  getTeams(){
    this._teamService.getTeams().subscribe(result => {
      result.map(res=>{
        if(this.teamIDs.includes(res.teamID)){
          this.teams2.push(res);
        }
      });
      console.log(this.teams2)
    });
  }

  makeGames(competition: Competition) {
    for (let i = 0; i < this.teams2.length; i += 0) {
      for (let j = 0; j < this.teams2.length; j++) {
        if (j + 1 < this.teams2.length) {
          console.log(this.teams2[i].teamID + "vs" + this.teams2[j + 1].teamID);
          //eerste matchen
          this.game.team1ID = this.teams2[i].teamID;
          this.game.team2ID = this.teams2[j+1].teamID;
          this.game.competitionID = competition.competitionID;
          this._gameService.addGame(this.game).subscribe(()=>{
            this._gameService.getGames().subscribe(result=>{
              this.games = result;
            })
          });
          console.log(this.teams2[j+1].teamID + "vs" + this.teams2[i].teamID);
          //terugmatchen
          this.game.team2ID = this.teams2[i].teamID;
          this.game.team1ID = this.teams2[j+1].teamID;
          this.game.competitionID = competition.competitionID;
          this._gameService.addGame(this.game).subscribe(()=>{
            this._gameService.getGames().subscribe(result=>{
              this.games = result;
            })
          });
          
        }
      }
      this.teams2 = this.teams2.slice(1);
    }
    this.router.navigate(['makeGames/'+this.id]);
  }

  viewGames(){
    this.router.navigate(['makeGames/'+this.id]);
  }
}
