import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Competition } from 'src/app/shared/models/competition.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';

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

  constructor(private router: Router, private _competitionService: CompetitionService, private snackBar: MatSnackBar) {
    this._competitionService.getCompetitions().subscribe(result => {
      this.competitions = result;
    });
  }

  ngOnInit(): void {
  }

  viewRanking(id: number) {
    this.router.navigate(['adminRanking/' + id]);
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
    console.log(competition);
    if (competition) {
      this._competitionService.deleteCompetition(competition.competitionID).subscribe(()=>{
        this.update();
      })
    } else {
      this.snackBar.open("Je moet eerst een competitie selecteren", "", { duration: 5000 });
    }
  }

  update(){
    this._competitionService.getCompetitions().subscribe(result => {
      this.competitions = result;
    });
  }



}
