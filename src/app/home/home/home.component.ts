import { Component, OnInit } from '@angular/core';
import { Game } from '../../shared/models/game.model';
import { Competition } from '../../shared/models/competition.model';
import { Team } from '../../shared/models/team.model';
import { CompetitionService } from '../../shared/services/competition.service';
import { GameService } from '../../shared/services/game.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { RankingService } from '../../shared/services/ranking.service';
import { Ranking } from 'src/app/shared/models/ranking.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  competition: Competition;

  nextGameComp: Game = null;
  nextGameFriend: Game = null;
  rankings: Ranking[];
  sortedGames: Game[] = null;
  currentUser: User;
  bezig: boolean = false;
  constructor(private _competitionService: CompetitionService, private _gameService: GameService, private _teamService: TeamService,
    private _rankingService: RankingService) {

  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //this.currentUser.teamID = null
    if (this.currentUser) {
      //console.log(this.currentUser)
      this._rankingService.getRankingByTeam(this.currentUser.teamID).subscribe((value) => {
        this._competitionService.getCompetition(value.competitionID).subscribe(value => this.competition = value)
      })
      //this._teamService.getTeam(user.teamid).subscribe(value => console.log(value))
      //console.log("currentuser team id", this.currentUser.teamID)
      this._gameService.GetNextCompetitionGameByTeam(this.currentUser.teamID).subscribe(
        (value) => {this.nextGameComp = value; if(value.gameStatusID == 2){this.bezig = true}});
      this._gameService.GetNextFriendlyGameByTeam(this.currentUser.teamID).subscribe(value => this.nextGameFriend = value)

      //Ophalen van alle games
      this._gameService.getNextGamesByTeam(this.currentUser.teamID).subscribe((value) => {
        //console.log("games", value);
        //Sorteren van de games obv datum
        if (value.length == 0) {
          this.sortedGames = null;
        }
        if (value.length > 0) {
          this.sortedGames = value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        }


      })


    }

    this._rankingService.getRankings().subscribe((value) => {
      //console.log("ranking", value);
      value.sort((a, b) => b.points - a.points)
      //console.log("ranking after sort", value)
      this.rankings = value
    })


  }
}
