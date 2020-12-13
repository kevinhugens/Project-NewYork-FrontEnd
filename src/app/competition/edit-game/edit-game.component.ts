import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/shared/models/game.model';
import { Team } from 'src/app/shared/models/team.model';
import { GameService } from 'src/app/shared/services/game.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {
  game: Game;
  minDate = new Date();
  timeFormGroup: FormGroup;
  date: Date = new Date();
  date2: Date = new Date();

  id = this.route.snapshot.params['id'];
  constructor(private route: ActivatedRoute, private router: Router, private _gameService: GameService, private _teamService: TeamService, private _formBuilder: FormBuilder) {
    this._gameService.getGame(this.id).subscribe(result => {
      this.game = result;
      this.date = this.game.date;
      var year = parseInt(this.game.date.toString().substring(0, 4));
      var month = parseInt(this.game.date.toString().substring(5, 7));
      var day = parseInt(this.game.date.toString().substring(8, 10));
      this.date2.setMonth(month-1);
      this.date2.setFullYear(year);
      this.date2.setDate(day);
      this.setForm();
    });
  }

  ngOnInit(): void {
    this.timeFormGroup = this._formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
    });

  }

  setForm() {
    var time = (this.date.toString().split("T")[1].slice(0, -3));
    time = time.substring(0, 5)
    this.timeFormGroup.setValue({
      date: this.date2,
      time: time
    })
  }

  onSubmitUpdateGame() {
    this.date = this.timeFormGroup.controls.date.value;
    //console.log(this.date)
    //console.log(this.timeFormGroup.controls.time.value)
    //console.log(this.game);
    this.date.setHours(parseInt(this.timeFormGroup.controls.time.value.toString().split(":")[0])+1, parseInt(this.timeFormGroup.controls.time.value.toString().split(":")[1]));
    this.game.date = this.date;
    this._gameService.updateGame(this.game.gameID, this.game).subscribe(()=>{
      this.router.navigate(["makeGames/" + this.game.competitionID]);
    });
    //console.log(this.game)

  }

}
