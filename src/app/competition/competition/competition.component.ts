import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Competition } from 'src/app/shared/models/competition.model';
import { Game } from 'src/app/shared/models/game.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';
import { GameService } from 'src/app/shared/services/game.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  competitions: Competition[];
  //confirmation
  popoverTitle = 'Verwijder Competitie?';
  popoverMessage = 'Ben je zeker dat je deze competitie wilt verwijderen?';
  confirmClicked = false;
  cancelClicked = false;

  constructor(private router: Router, private _competitionService: CompetitionService, private snackBar: MatSnackBar, private _gameService: GameService, private _teamService: TeamService) {
    this._competitionService.getCompetitions().subscribe(result => {
      this.competitions = result;
    });
  }

  ngOnInit(): void {
  }

  viewRanking(competition: Competition) {
    if(competition){
      this.router.navigate(['adminRanking/' + competition.competitionID]);
    }
    else {
      this.snackBar.open("Je moet eerst een competitie selecteren", "", { duration: 5000 });
    }
    
  }

  onEdit(competition: Competition) {
    if (competition) {
      this.router.navigate(['competition/' + competition.competitionID]);
    } else {
      this.snackBar.open("Je moet eerst een competitie selecteren", "", { duration: 5000 });
    }
  }

  onAdd() {
    this.router.navigate(['addCompetition']);
  }

  onDelete(competition: Competition) {
    //console.log(competition);
    if (competition) {
      this._gameService.getGames().subscribe(result => {
        result.map(res => {
          if (res.competitionID == competition.competitionID) {
            this._gameService.deleteGame(res.gameID).subscribe();
          }
        });
      }
      )
      this.deleteCompetition(competition);
      this.deleteCompetition(competition);


    } else {
      this.snackBar.open("Je moet eerst een competitie selecteren", "", { duration: 5000 });
    }
  }

  update() {
    this._competitionService.getCompetitions().subscribe(result => {
      this.competitions = result;
    });
  }

  deleteCompetition(competition: Competition) {
    this._competitionService.deleteCompetition(competition.competitionID).subscribe(() => {
      this.update();
    });
  }



}
