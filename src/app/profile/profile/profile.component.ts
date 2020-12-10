import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { UserGame } from 'src/app/shared/models/user-game.model';
import { User } from 'src/app/shared/models/user.model';
import { GameService } from 'src/app/shared/services/game.service';
import { UserGameService } from 'src/app/shared/services/user-game.service';
import { AuthenticateService } from '../../security/services/authenticate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  activeUser: User;
  userGames: UserGame[];
  playedGames: number = 0;
  wonGames: number = 0;
  lostGames: number = 0;
  gameIdsWonByTeam: number[] = [];

  //ChartSettings
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend:{
      onClick: (e) => e.stopPropagation()
    },
  };
  public pieChartLabels:string[] = ['Gewonnen', 'Verloren'];
  public pieChartData:number[]=[];
  public pieChartType:string = 'pie';
  public pieChartColors: Color[] = [
    {
      backgroundColor: ['rgb(50, 255, 128)', 'rgb(252, 62, 62)'],
    },
  ];

  constructor(private _authenticateService: AuthenticateService, private _userGameService: UserGameService, private _gameService: GameService) {
    this._authenticateService.loggedUser.subscribe(result => {
      this.activeUser = result;
    });
    this._gameService.getGames().subscribe(result => {
      result.map(res => {
        if (res.team1ID == this.activeUser.teamID && res.scoreTeam1 > res.scoreTeam2) {
          this.gameIdsWonByTeam.push(res.gameID);
        } else if (res.team2ID == this.activeUser.teamID && res.scoreTeam2 > res.scoreTeam1) {
          this.gameIdsWonByTeam.push(res.gameID);
        }
      });
    });
    console.log(this.gameIdsWonByTeam)

  }

  ngOnInit(): void {
    this.checkPlayedGames();
  }

  checkWonGame() {
    this._userGameService.getUserGames().subscribe(result => {
      this.userGames = result;
      result.map(res => {
        if (res.userID == this.activeUser.userID) {
          if (this.gameIdsWonByTeam.includes(res.gameID)) {
            this.wonGames += 1;
          }
        }
      });
      this.makeChart();
    });
  }

  checkPlayedGames(){
    this._userGameService.getUserGames().subscribe(result => {
      this.userGames = result;
      result.map(res => {
        if (res.userID == this.activeUser.userID) {
          this.playedGames += 1;
        }
      });
    });
    this.checkWonGame();
  }

  makeChart(){
    this.lostGames = this.playedGames-this.wonGames;
    this.pieChartData = [this.wonGames, this.lostGames]
  }


}
