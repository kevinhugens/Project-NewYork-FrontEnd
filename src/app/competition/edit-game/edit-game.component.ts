import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  // time: Date= new Date;
  hour: any;
  minuten: number;

  id = this.route.snapshot.params['id'];
  constructor(private route: ActivatedRoute, private router: Router, private _gameService: GameService, private _teamService: TeamService) {
    this._gameService.getGame(this.id).subscribe(result => {
      this.game = result;
      this.date = this.game.date;
      console.log(this.hour)
    });
  }

  ngOnInit(): void {
  }

  onSubmitUpdateGame(){
    console.log(this.date)
    console.log(this.date)
    console.log(this.game)
    // this.date.setHours(parseInt(this.time.toString().split(":")[0]), parseInt(this.time.toString().split(":")[1]));
    this.game.date=  this.date;
    // this._gameService.updateGame(this.game.gameID, this.game).subscribe(()=>{
    //   this.router.navigate(["makeGames/" + this.game.competitionID]);
    // })
    this._gameService.updateGame(this.game.gameID, this.game).subscribe();
    console.log(this.game)

  }

}
