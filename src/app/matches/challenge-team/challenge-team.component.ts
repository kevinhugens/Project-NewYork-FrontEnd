import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

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

  maxDate = new Date();
  minDate = new Date();

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1); // A game can be planned a year in advance but no more
    this.minDate.setDate(this.minDate.getDate() + 5); // A game has to be planned at min 5days before

    this.teamFormGroup = this._formBuilder.group({
      team: ['', Validators.required]
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
  }

  goBack(stepper: MatStepper) {
    console.log("Step back");
    stepper.previous();
  }

}
