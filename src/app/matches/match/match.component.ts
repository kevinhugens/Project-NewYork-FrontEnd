import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap, map } from 'rxjs/operators';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { User } from 'src/app/shared/models/user.model';
import { GameService } from 'src/app/shared/services/game.service';
import { Game } from '../../shared/models/game.model';
import { ChallengeTeamComponent } from '../challenge-team/challenge-team.component';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  games: Game[];
  showStepper: boolean = false;
  numberNewChallenges: number;

  renderOpen: boolean = false;

  // The first next game that is planned (closest to today)
  nextGame: Game;
  // All the games that are planned (except the one that is first next)
  plannedGames: Game[];
  // All the games that are past (sorteren volgens)
  playedGames: Game[];

  currentUser: User;

  constructor(private _authService: AuthenticateService, public dialog: MatDialog, private _gameService: GameService) {

    this._authService.loggedUser.subscribe(
      result => {
        console.log("Current user is:", result);
        this.currentUser = result;
      }
    );

    this._gameService.getGames().subscribe(
      result => {
        this.games = result;
      }
    );

    this._gameService.GetNextFriendlyGameUser(this.currentUser.teamID).pipe(
      tap(t => console.log("Next friendly game of the user his team:", t)),
    ).subscribe(
      result => {
        console.log("Next friendly game of the user his team:", result);
        this.nextGame = result;
      }
    );

    this._gameService.GetPlannedFriendlyTeamGames(this.currentUser.teamID).pipe(
      map(games => games.filter(game => game.gameID != this.nextGame.gameID)) // Filter the next game out of the planned games because this is showed separate
    ).subscribe(
      result => {
        console.log("Planned games for the user his team:", result);
        this.plannedGames = result;
      }
    );

    this._gameService.GetPlayedFriendlyTeamGames(this.currentUser.teamID).pipe(
      tap(t => console.log("Played games of the user his team:", t)),
    ).subscribe(
      result => {
        console.log("Played games of the user his team:", result);
        this.playedGames = result;
      }
    );

  }

  onNumberNewChallenges(numberNewChallenges: number) {
    this.numberNewChallenges = numberNewChallenges;
    this._gameService.GetNextFriendlyGameUser(this.currentUser.teamID).pipe(
      tap(t => console.log("Next friendly game of the user his team:", t)),
    ).subscribe(
      result => {
        this.nextGame = result;
      }
    );

    this._gameService.GetPlannedFriendlyTeamGames(this.currentUser.teamID).pipe(
      map(games => games.filter(game => game.gameID != this.nextGame.gameID)) // Filter the next game out of the planned games because this is showed separate
    ).subscribe(
      result => {
        this.plannedGames = result;
      }
    );

  }

  ngOnInit(): void {
    this._authService.loggedUser.subscribe(
      result => {
        console.log("Current user is:", result);
        this.currentUser = result;
      }
    );
  }

  toggleStepper() {
    this.showStepper = !this.showStepper; // Toggle the show stepper
    // Open dialog
    this.dialog.open(ChallengeTeamComponent, { data: { currentUser: this.currentUser } });
  }

  onParticipationChanged(event) {
    this._gameService.GetNextFriendlyGameUser(this.currentUser.teamID).pipe(
      tap(t => console.log("Next friendly game of the user his team:", t)),
    ).subscribe(
      result => {
        console.log("Next friendly game of the user his team:", result);
        this.nextGame = result;
      }
    );

    this._gameService.GetPlannedFriendlyTeamGames(this.currentUser.teamID).pipe(
      map(games => games.filter(game => game.gameID != this.nextGame.gameID)) // Filter the next game out of the planned games because this is showed separate
    ).subscribe(
      result => {
        console.log("Planned games for the user his team:", result);
        this.plannedGames = result;
      }
    );
    // Re make Challenges??????????????????????????µ
    this.renderOpen = !this.renderOpen;
  }

}
