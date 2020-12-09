import { Component, OnInit } from '@angular/core';
import {Game} from '../../shared/models/game.model';
import {Competition} from '../../shared/models/competition.model';
import {Team} from '../../shared/models/team.model';
import {CompetitionService} from '../../shared/services/competition.service';
import {GameService} from '../../shared/services/game.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { RankingService} from '../../shared/services/ranking.service';
import { Ranking } from 'src/app/shared/models/ranking.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  competition: Competition;

  nextGameComp: Game;
  nextGameFriend: Game = null;
  rankings: Ranking[];
  sortedGames: Game[] = null;

  constructor(private _competitionService: CompetitionService, private _gameService: GameService, private _teamService: TeamService, 
    private _rankingService: RankingService ) { 
    
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void{
    //this._teamService.getTeam(user.teamid).subscribe(value => console.log(value))
    this._competitionService.getCompetition(1).subscribe(value => this.competition = value);
    this._gameService.GetNextCompetitionGame().subscribe(value => this.nextGameComp = value);
    this._gameService.GetNextFriendlyGame().subscribe(value => this.nextGameFriend = value)

    //Ophalen van alle games
    this._gameService.getGames().subscribe((value) => {
      console.log("games", value);
      //Sorteren van de games obv datum
      this.sortedGames = value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      
    })
     
    
    this._rankingService.getRankings().subscribe((value) => {
      //console.log("ranking", value);
      value.sort((a, b) => b.points-a.points)
      //console.log("ranking after sort", value)
      this.rankings = value
    })
  }
}
