import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, tap } from 'rxjs/operators';
import { Game } from 'src/app/shared/models/game.model';
import { UserGame } from 'src/app/shared/models/user-game.model';
import { User } from 'src/app/shared/models/user.model';
import { GameService } from 'src/app/shared/services/game.service';
import { UserGameService } from 'src/app/shared/services/user-game.service';

@Component({
  selector: 'app-open-challenges',
  templateUrl: './open-challenges.component.html',
  styleUrls: ['./open-challenges.component.scss']
})
export class OpenChallengesComponent implements OnInit {

  @Input() currentUser: User; // Receive from parent
  @Output() numberNewChallenges = new EventEmitter<number>(); // Send to parent


  challenges: Game[]; // All friendly games of a team where there are no players of this team in the userGame table
  // numberOfNewChallenges to parent

  constructor(private _gameService: GameService, private _userGameService: UserGameService, private snackBar: MatSnackBar) {

    this.getGameChallenges();

  }

  participateGame(gameID: number) {
    console.log("User wants to participate on game with id:", gameID);
    // Make new user game
    this._userGameService.addUserGame(new UserGame(0, this.currentUser.userID, gameID)).subscribe(
      result => {
        console.log("User participates on the game!", result);
        this.snackBar.open("Je neemt deel aan de wedstrijd!", "", { duration: 5000 }); // UNDO ERBIJ STEKEN?
        // Filter the list of challenges
        this.challenges.filter(challenge => challenge.gameID == gameID);
        // REFRESH THE LIST ON THE WEDSTRIJD PAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // REFRESH THE LIST ON THE WEDSTRIJD PAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // REFRESH THE LIST ON THE WEDSTRIJD PAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // REFRESH THE LIST ON THE WEDSTRIJD PAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // REFRESH THE LIST ON THE WEDSTRIJD PAGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.getGameChallenges();
      }
    )
  }


  getGameChallenges() {
    this._gameService.getGames().pipe(
      tap(t => console.log("All games:", t)),
      map(challenges => challenges.filter(challenge => (challenge.type == "2vs2" && challenge.userGames.length < 4 && challenge.team2ID == this.currentUser.teamID) || (challenge.type == "1vs1" && challenge.userGames.length < 2 && challenge.team2ID == this.currentUser.teamID))), // only show the games where there are empty players
      tap(t => console.log("Filtered games (challenges):", t)),
    )
      .subscribe(
        result => {
          this.challenges = result;
          this.numberNewChallenges.emit(result?.length);
        });
  }


  ngOnInit(): void {
  }

}
