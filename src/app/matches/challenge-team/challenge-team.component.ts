import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { Table } from 'src/app/shared/models/table.model';
import { Game } from 'src/app/shared/models/game.model';

import { CreatedMatchDialogComponent } from './created-match-dialog/created-match-dialog.component';


import { TeamService } from 'src/app/shared/services/team.service';
import { TableService } from 'src/app/shared/services/table.service';
import { UserService } from 'src/app/shared/services/user.service';
import { GameService } from 'src/app/shared/services/game.service';


import { map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-challenge-team',
  templateUrl: './challenge-team.component.html',
  styleUrls: ['./challenge-team.component.scss']
})
export class ChallengeTeamComponent implements OnInit {

  teamFormGroup: FormGroup;
  timeFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  playerFormGroup: FormGroup;
  isEditable = false;

  teams: Team[];
  players: User[];
  tables: Table[];

  game: Game;
  gameType: string = null;

  maxDate = new Date();
  minDate = new Date();

  constructor(private _formBuilder: FormBuilder, private _teamService: TeamService, private _tableService: TableService, private _userService: UserService, private _gameService: GameService, public dialog: MatDialog) {
    // Get Teams
    this._teamService.getTeams()
      .pipe(
        tap(t => console.log("All teams:", t)),
        // Need to only get the teams were the user isn't part of
        tap(t => console.log("Filtered teams:", t))
      ).subscribe(
        result => {
          this.teams = result;
          console.log("In result", this.teams);
        }
      )
    // Get Tables
    this._tableService.getTables()
      .pipe(
        tap(t => console.log("All tables:", t)),
      ).subscribe(
        result => {
          this.tables = result;
        }
      )
    // Get Users
    this._userService.getUsers()
      .pipe(
        tap(t => console.log("All users:", t)),
        // Need to get only the players of the user his team
      ).subscribe(
        result => {
          this.players = result;
        }
      )

  }

  ngOnInit() {

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1); // A game can be planned a year in advance but no more
    this.minDate.setDate(this.minDate.getDate() + 5); // A game has to be planned at min 5days before

    this.teamFormGroup = this._formBuilder.group({
      team: [, Validators.required]
    });
    this.timeFormGroup = this._formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
    this.locationFormGroup = this._formBuilder.group({
      table: ['', Validators.required]
    });
    this.playerFormGroup = this._formBuilder.group({
      type: ['', Validators.required],
      player: ['', Validators.required]
    });

    this.gameType = this.playerFormGroup.controls.type.value;
    console.log("GameType:", this.gameType)

  }

  goBack(stepper: MatStepper) {
    console.log("Step back:", stepper);
    stepper.previous();
  }

  changeType(event) {
    console.log("type changed", event.value);
    this.gameType = event.value;
  }

  clearRadioButtons() {
    this.gameType = null;
  }

  onChangeTeam(iets) {
    console.log("Team changed", iets);
  }

  challenge() {
    console.log("User want to create the challenge");
    console.log("Team to challenge (teamID):", this.teamFormGroup.controls.team.value);
    console.log("Tijdstip:", this.timeFormGroup.controls.date.value, this.timeFormGroup.controls.time.value);
    console.log("Locatie (tableID):", this.locationFormGroup.controls.table.value); // gaat id teruggeven
    console.log("Game type:", this.playerFormGroup.controls.type.value);
    console.log("Selected player ID's:", this.playerFormGroup.controls.player.value);


    var date = new Date();
    date = this.timeFormGroup.controls.date.value;
    date.setHours(parseInt(this.timeFormGroup.controls.time.value.toString().split(":")[0]), parseInt(this.timeFormGroup.controls.time.value.toString().split(":")[1]));
    console.log("Date object:", date);

    // Create a new game
    this.game = new Game(0, this.playerFormGroup.controls.type.value, 0, 0, date, 1, parseInt(this.teamFormGroup.controls.team.value), null, parseInt(this.locationFormGroup.controls.table.value));
    // this.game = new Game(gameID, type, scoreteam1, scoreteam2, date, team1id, team2id, competitie, tableID);
    console.log("Create game", this.game);
    this._gameService.addGame(this.game).subscribe(
      result => {
        console.log("Game added:", result);

        this._gameService.getGame(result.gameID).subscribe(
          result => {
            console.log("Game get by id:", result);
            // Show dialog with the game that is made
            let dialogRef = this.dialog.open(CreatedMatchDialogComponent, { data: { game: result } });

            dialogRef.afterClosed().subscribe(result => {
              console.log("Dialog result:", result);

              // // Discard the article
              // if (result == "discard") {
              //   // Article back to draft so journalist can change the article
              //   article.articleStatusID = 3;
              //   delete (article.articleStatus);
              //   console.log("Admin wants to discard article with id:", article.articleID);
              //   console.log("Admin wants to discard article:", article);
              //   this._articleService.updateArticle(article.articleID, article).subscribe(
              //     () => {
              //       console.log("Article is discarded (back to draft)");
              //       this.dataSource = this.articles.filter(item => item.articleID !== article.articleID); // Remove the published article from the table
              //       this.openSnackBar("Article is discarded", "Undo", article);
              //     }
              //   );
              // }

              // // Publish the article
              // else if (result == "publish") {
              //   // Publisch the article
              //   article.articleStatusID = 1;
              //   delete (article.articleStatus);
              //   console.log("Publish article:", article);
              //   this._articleService.updateArticle(article.articleID, article).subscribe(
              //     () => {
              //       console.log("Article is published");
              //       this.dataSource = this.articles.filter(item => item.articleID !== article.articleID); // Remove the published article from the table
              //       this.openSnackBar("Article is published", "Undo", article);
              //     }
              //   );
              // } else {
              //   // Closing the dialog means do nothing
              //   this.snackBar.open("Status of article isn't changed!", "", { duration: 5000 });
              // }
            });
          }
        );


      }
    );

    // Create new userGames
  }

}
