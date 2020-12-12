import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Competition } from 'src/app/shared/models/competition.model';
import { Game } from 'src/app/shared/models/game.model';
import { UserGame } from 'src/app/shared/models/user-game.model';
import { User } from 'src/app/shared/models/user.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';
import { GameService } from 'src/app/shared/services/game.service';
import { RankingService } from 'src/app/shared/services/ranking.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { UserGameService } from 'src/app/shared/services/user-game.service';

@Component({
  selector: 'app-live-overzicht',
  templateUrl: './live-overzicht.component.html',
  styleUrls: ['./live-overzicht.component.scss']
})
export class LiveOverzichtComponent implements OnInit {
  livegames: Game[]
  spelersTeam1: UserGame[];
  spelersTeam2: UserGame[];
  userGames: UserGame[];
  noGames: boolean = true;
  constructor(private _competitionService: CompetitionService, private _teamService: TeamService, private _gameService: GameService, private _authService: AuthenticateService, private _userGameService: UserGameService, private snackBar: MatSnackBar, private router: Router,
    private _uploadService: UploadService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._gameService.getLiveGames().subscribe((value) => {
      this.livegames = value;
      if (this.livegames.length > 0) {
        this.noGames = false;
        this.livegames.forEach(element => {
          if (element.competitionID == null) {
            element["competitionName"] = "Vriendschappelijke wedstrijd"
          }
          if (element.competitionID != null) {
            this._competitionService.getCompetition(element.competitionID).subscribe((value) => {
              element["competitionName"] = value.name;
            })
          }
          this._uploadService.getPhoto(element.team1.photo).subscribe((value) => {
            element["team1Picture"] = value
          });
          this._uploadService.getPhoto(element.team2.photo).subscribe((value) => {
            element["team2Picture"] = value
          });

          this._competitionService
          this._userGameService.getUserGameByGame(element.gameID).subscribe((value) => {
            element["userGames"] = value;

            // element["spelersTeam1"] = value.filter((userGame: UserGame) => userGame.player.teamID== element.team1ID)

            // this.spelersTeam2 = value.filter((userGame: UserGame) => userGame.player.teamID== element.team2ID)
            // console.log("spelers team 2", this.spelersTeam2)
          })
        });
        console.log("livegames", this.livegames);
      }

    })
  }

}
