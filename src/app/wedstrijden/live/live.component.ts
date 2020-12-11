import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from 'src/app/home/home/home.component';
import { Competition } from 'src/app/shared/models/competition.model';
import { Game } from 'src/app/shared/models/game.model';
import { Ranking } from 'src/app/shared/models/ranking.model';
import { UserGame } from 'src/app/shared/models/user-game.model';
import { User } from 'src/app/shared/models/user.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';
import { GameService } from 'src/app/shared/services/game.service';
import { RankingService } from 'src/app/shared/services/ranking.service';
import { UserGameService } from '../../shared/services/user-game.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  gameID: any;
  chosengame: Game;
  competition: Competition;
  rankingTeam1: Ranking;
  rankingTeam2: Ranking;
  disabled: boolean = true;
  spelersTeam1: UserGame[];
  spelersTeam2: UserGame[];
  userGames: UserGame[];
  constructor(private route:ActivatedRoute, private _gameService: GameService, private _competitionService: CompetitionService, private snackBar: MatSnackBar, private _rankingService: RankingService, private router: Router, private home: HomeComponent,
    private _userGameService: UserGameService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.route.paramMap.subscribe(params => {
      this.gameID = params.get('id');
    });

    this._gameService.getGame(this.gameID).subscribe((value) => {
      this.chosengame = value;
      console.log("game", this.chosengame)
      if(this.chosengame.competitionID != null){
        this._competitionService.getCompetition(this.chosengame.competitionID).subscribe((value) => {
          this.competition = value;
        })
      }
      if(this.chosengame.scoreTeam1 > 10 && (this.chosengame.scoreTeam1 - this.chosengame.scoreTeam2) > 1){
        this.disabled = false
      }
      if(this.chosengame.scoreTeam2 > 10 && (this.chosengame.scoreTeam2 - this.chosengame.scoreTeam1) > 1){
        this.disabled = false
      }

      this._userGameService.getUserGameByGame(this.chosengame.gameID).subscribe((value) => {
        this.spelersTeam1 = value.filter((userGame: UserGame) => userGame.user.teamID == this.chosengame.team1ID)
      })
      this._userGameService.getUserGameByGame(this.chosengame.gameID).subscribe((value) => {
        this.spelersTeam2 = value.filter((userGame: UserGame) => userGame.user.teamID == this.chosengame.team2ID)
      })
    })

  }

  scoreGoal(team: number){

    if(team == 1){
        this.chosengame.scoreTeam1 +=1;
        this._gameService.updateGame(this.chosengame.gameID, this.chosengame).subscribe(value => this.getData())
    }

    if(team == 2){
        this.chosengame.scoreTeam2 +=1;
        this._gameService.updateGame(this.chosengame.gameID, this.chosengame).subscribe(value =>  this.getData())
    }
  }

  validateGame(){
    if(this.chosengame.scoreTeam1 > 10 || this.chosengame.scoreTeam2 > 10 ) {
      if(this.chosengame.scoreTeam1 == this.chosengame.scoreTeam2){
        this.snackBar.open("Gelieve door te spelen tot er een verschil is van 2 punten! gelijk", "", { duration: 5000 });
      }
      else{
        this.chosengame.gameStatusID = 3;
        this._gameService.updateGame(this.chosengame.gameID, this.chosengame).subscribe()

        if(this.chosengame.scoreTeam1 > this.chosengame.scoreTeam2){
          this._rankingService.getRankingByTeam(this.chosengame.team1ID).subscribe((value) => {
            console.log("ranking team 1", value)
            this.rankingTeam1 = value;
            this.rankingTeam1.points +=3;
            this._rankingService.updateRanking(this.rankingTeam1.rankingID, this.rankingTeam1).subscribe(value => this.home.getData());
          })
          this.snackBar.open("Proficiat met de overwinning " + this.chosengame.team1.teamName + "!", "", { duration: 5000 });
        }
        if(this.chosengame.scoreTeam1 < this.chosengame.scoreTeam2){
          this._rankingService.getRankingByTeam(this.chosengame.team2ID).subscribe((value) => {
            console.log("ranking team 2", value)
            this.rankingTeam2 = value;
            this.rankingTeam2.points +=3;
            this._rankingService.updateRanking(this.rankingTeam2.rankingID, this.rankingTeam2).subscribe(value => this.home.getData());
          })
          this.snackBar.open("Proficiat met de overwinning " + this.chosengame.team2.teamName + "!", "", { duration: 5000 });
        }

        this.router.navigate(["home"])
      }
      
      
    }
    else{
      this.snackBar.open("Gelieve door te spelen tot 1 van de ploegen aan 11 punten komt!", "", { duration: 5000 });

    }
  }



  sendToModerator(){
    this.chosengame.gameStatusID =4;
    this._gameService.updateGame(this.chosengame.gameID, this.chosengame).subscribe();
    this.snackBar.open("Game is successvol doorgestuurd naar de moderator", "", { duration: 5000 });
    this.router.navigate(["home"])
  }
}
