import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { User } from 'src/app/shared/models/user.model';
import { Game } from '../../shared/models/game.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  games: Game[];
  showStepper: boolean = false;
  numberNewChallenges: number;

  currentUser: User;

  constructor(private _authService: AuthenticateService) {
    this._authService.loggedUser.subscribe(
      result => {
        console.log("Current user is:", result);
        this.currentUser = result;
      }

    )
  }

  onNumberNewChallenges(numberNewChallenges: number) {
    this.numberNewChallenges = numberNewChallenges;
  }

  // constructor(private _gameService: GameService) {
  //   this._gameService.getGames()
  //   .pipe(
  //     map(games => games.filter(game => article.articleStatusID === 1)), // Only get the aricles ready for publication
  //     tap(t => console.log("Get Articles tap:", t))
  //   )
  //   .subscribe(
  //   result => {
  //     this.articles = result;
  //   });
  //  }

  ngOnInit(): void {
  }

  toggleStepper() {
    this.showStepper = !this.showStepper; // Toggle the show stepper
  }

}
