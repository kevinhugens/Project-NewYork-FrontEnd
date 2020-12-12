import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competition } from 'src/app/shared/models/competition.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';

@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html',
  styleUrls: ['./add-competition.component.scss']
})
export class AddCompetitionComponent implements OnInit {
  competition: Competition = new Competition(0, "", "", null, null);

  constructor(private router: Router, private _competitionService: CompetitionService) { }

  ngOnInit(): void {
  }

  backToCompetitions() {
    this.router.navigate(["competition"]);
  }

  onSubmitCreateCompetition(){
    this._competitionService.addCompetition(this.competition).subscribe(()=>{
      this.router.navigate(["competition"]);
    });
  }

}
