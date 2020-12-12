import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from 'src/app/shared/models/competition.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';

@Component({
  selector: 'app-edit-competition',
  templateUrl: './edit-competition.component.html',
  styleUrls: ['./edit-competition.component.scss']
})
export class EditCompetitionComponent implements OnInit {
  competition: Competition;


  id = this.route.snapshot.params['id'];
  constructor(private route: ActivatedRoute, private router: Router, private _competitionService: CompetitionService) {
    this._competitionService.getCompetition(this.id).subscribe(result => {
      this.competition = result;
    });
  }

  ngOnInit(): void {
  }

  backToCompetitions() {
    this.router.navigate(["competition"]);
  }

  onSubmitUpdateCompetition() {
    this._competitionService.updateCompetition(this.competition.competitionID, this.competition).subscribe(() => {
      this.router.navigate(["competition"]);
    });
  }

}
