import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
        this.nextGame = result[0]; // NEEDS TO BE CHANGEDDDDDDDDDD
        this.plannedGames = result; // NEEDS TO BE CHANGEDDDDDDDDDD and filtered
        this.playedGames = result; // NEEDS TO BE CHANGEDDDDDDDDDD and filtered
      }
    )
  }

  onNumberNewChallenges(numberNewChallenges: number) {
    this.numberNewChallenges = numberNewChallenges;
  }

  ngOnInit(): void {
  }

  toggleStepper() {
    this.showStepper = !this.showStepper; // Toggle the show stepper
    // Open dialog
    this.dialog.open(ChallengeTeamComponent, { data: { currentUser: this.currentUser } });
  }

}
