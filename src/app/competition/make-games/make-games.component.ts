import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from 'src/app/shared/models/competition.model';
import { Game } from 'src/app/shared/models/game.model';
import { Team } from 'src/app/shared/models/team.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';
import { GameService } from 'src/app/shared/services/game.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { EditGameComponent } from '../edit-game/edit-game.component';

@Component({
  selector: 'app-make-games',
  templateUrl: './make-games.component.html',
  styleUrls: ['./make-games.component.scss']
})
export class MakeGamesComponent implements OnInit {
  competition: Competition;
  games: Game[] = [];
  teams: Team[];

  id = this.route.snapshot.params['id'];
  constructor(private route: ActivatedRoute, private router: Router, private _competitionService: CompetitionService, private _gameService: GameService,
    private _teamService: TeamService, private dialog: MatDialog) {
    this._competitionService.getCompetition(this.id).subscribe(result => {
      this.competition = result;
      this.getGames();
    });

    this._teamService.getTeams().subscribe(result=>{
      this.teams = result;
    });

  }

  ngOnInit(): void {
console.log(this.games)
  }

  getGames() {
    this._gameService.getGames().subscribe(result => {
      result.map(res => {
        if (res.competitionID == this.competition.competitionID) {
          this.games.push(res);
        }
      })
    })
  }

  changeGame(game: Game){
    this.router.navigate(['editGame/' + game.gameID])
  }

  backToCompetitions() {
    this.router.navigate(["adminRanking/" + this.competition.competitionID]);
  }

}
