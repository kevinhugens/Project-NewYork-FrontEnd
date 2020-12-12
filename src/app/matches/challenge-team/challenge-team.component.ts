import { Component, Inject, OnInit } from '@angular/core';
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
import { UserGameService } from 'src/app/shared/services/user-game.service';


import { map, tap } from 'rxjs/operators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserGame } from 'src/app/shared/models/user-game.model';


@Component({
  selector: 'app-challenge-team',
  templateUrl: './challenge-team.component.html',
  styleUrls: ['./challenge-team.component.scss']
})
export class ChallengeTeamComponent implements OnInit {

currentUser: User;

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

  constructor(private _formBuilder: FormBuilder, private _teamService: TeamService, private _tableService: TableService, private _userService: UserService, private _gameService: GameService, public dialog: MatDialog, private snackBar: MatSnackBar, private router: Router, private _userGameService: UserGameService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = this.data.currentUser;
    
    // Get Teams
    this._teamService.getTeams()
      .pipe(
        tap(t => console.log("All teams:", t)),
        // Need to only get the teams were the user isn't part of
        map(teams => teams.filter(team => team.teamID!=this.currentUser.teamID)),
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
        map(players => players.filter(player => player.teamID==this.currentUser.teamID)),
        tap(t => console.log("Players of the same team as the logged in user:", t))

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
    date.setHours(parseInt(this.timeFormGroup.controls.time.value.toString().split(":")[0]) + 1, parseInt(this.timeFormGroup.controls.time.value.toString().split(":")[1]));
    console.log("Date object:", date);

    // Create a new game
    this.game = new Game(0, this.playerFormGroup.controls.type.value, 0, 0, date, 1, parseInt(this.teamFormGroup.controls.team.value), null, 1, parseInt(this.locationFormGroup.controls.table.value), );

    this._gameService.addGame(this.game).subscribe(
      result => {
        console.log("Game added:", result);
        this.game.gameID = result.gameID;

        // Close the stepper dialog
        this.dialog.closeAll();

        this._gameService.getGame(result.gameID).subscribe(
          result => {

            console.log("Game get by id:", result);
            // Show dialog with the game that is made
            let dialogRef = this.dialog.open(CreatedMatchDialogComponent, { data: { game: result } });

            dialogRef.afterClosed().subscribe(result => {
              console.log("Dialog result:", result);

              // Undo / delete the challenge & userGames (auto deleted when game is deleted)
              if (result == "undo") {
                // Delete the game and usergames and refresh the page
                console.log("The challenge with id:", this.game.gameID, "needs to be deleted!");
                this._gameService.deleteGame(this.game.gameID).subscribe(
                  () => {
                    console.log("De wedstrijd is verwijderd");
                    this.snackBar.open("De wedstrijd is verwijderd!", "");
                    // UserGame gets automatical deleted
                  }
                );
              } else {
                // Add the game and navigate to "wedstrijden"
                this.snackBar.open("De wedstrijd is aangemaakt!", "");
              }
              this.router.navigate(['wedstrijden']);
            });
          }
        );

        // Create new userGames (append players to a game)
        for (let userID of this.playerFormGroup.controls.player.value) {
          console.log("PlayerID:", userID);
          // this._userGameService.addUserGame(new UserGame(0, userID, this.game.gameID)).subscribe(
          this._userGameService.addUserGame(new UserGame(0, userID, this.game.gameID)).subscribe(
            () => {
              console.log("User with id:", userID, "added to the game challenge");
            }
          );
        }


      }
    );


  }

}
