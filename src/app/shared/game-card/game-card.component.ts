import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../models/game.model';
import { Competition } from '../models/competition.model';
import { Team } from '../models/team.model';
import { CompetitionService } from '../services/competition.service';
import { TeamService } from '../services/team.service';
import { GameService } from '../services/game.service';
import { User } from '../models/user.model';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { UserGameService } from '../services/user-game.service';
import { map, tap } from 'rxjs/operators';
import { UserGame } from '../models/user-game.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() competitionid: number;
  @Input() team1id: number;
  @Input() team2id: number;
  @Input() gameid: number;
  @Input() next: boolean;
  @Input() currentUser: User;
  @Input() passed: boolean;

  @Output() participationChanged = new EventEmitter<boolean>(); // Send to parent


  userParticipateGame: boolean = false;

  competition: Competition = null;
  team1: Team = null;
  team2: Team = null;
  game: Game = null;
  vriendschappelijk: string = "Vriendschappelijke wedstrijd";
  constructor(private _competitionService: CompetitionService, private _teamService: TeamService, private _gameService: GameService, private _authService: AuthenticateService, private _userGameService: UserGameService, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    // console.log(this.competitionid);
    this.getData();
  }

  getData() {
    if (this.team1id, this.team2id, this.gameid) {
      if (this.competitionid) {
        this._competitionService.getCompetition(this.competitionid).subscribe((value) => {
          //console.log("competition", value);
          this.competition = value;
          //console.log('competition this', this.competition)
        })
      }

      this._teamService.getTeam(this.team1id).subscribe((value) => {
        this.team1 = value;
        //console.log("team1:", this.team1)
      })
      this._teamService.getTeam(this.team2id).subscribe((value) => {
        this.team2 = value;
        //console.log("team2:", this.team2)
      })
      this._gameService.getGame(this.gameid).subscribe((value) => {
        this.game = value;
        //console.log("game", this.game)
      })
    }

    this._gameService.getGame(this.gameid).pipe(
      map(game => game.userGames.filter(userGame => userGame.userID == this.currentUser.userID && (game.team1ID == this.currentUser.teamID || game.team2ID == this.currentUser.teamID))), // Select al the games that the user plays
      tap(t => console.log("Games that the current user plays:", t))
    ).subscribe(
      result => {
        if(result.length==1)this.userParticipateGame = true;
      }
    );

  }

  deleteParticipation(){
    console.log("User wants to delete his participation!");
    this._userGameService.deleteUserGameByGameAndUser(this.game.gameID, this.currentUser.userID).subscribe(
      result => {
        console.log("Deelname is verwijderd:", result);
        this.userParticipateGame = false;
        this.getData();
        this.snackBar.open("Deelname verwijderd!", "");
        // Event emitter
        this.participationChanged.emit(true);

      }
    )
  }

}
