import { Component, Input, OnInit } from '@angular/core';
import {Game} from '../models/game.model';
import {Competition} from '../models/competition.model';
import {Team} from '../models/team.model';
import { CompetitionService } from '../services/competition.service';
import {TeamService} from '../services/team.service';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() competitionid: number;
  @Input() team1id: number;
  @Input() team2id: number;
  @Input() gameid: number;
  @Input() next: boolean;

  competition: Competition = null;
  team1: Team = null;
  team2:Team = null;
  game:Game = null;
  vriendschappelijk: string = "Vriendschappelijke wedstrijd";
  constructor(private _competitionService: CompetitionService, private _teamService: TeamService, private _gameService: GameService, private router: Router) { 

    
    
  }

  ngOnInit(): void {
    console.log(this.competitionid)
    this.getData();
  }

  getData(){
    if(this.team1id, this.team2id, this.gameid){
      if(this.competitionid){
        this._competitionService.getCompetition(this.competitionid).subscribe((value) => {
          //console.log("competition", value);
          this.competition = value;
          //console.log('competition this', this.competition)
        })
      }
      
      this._teamService.getTeam(this.team1id).subscribe((value) => {
        this.team1 = value;
        //console.log("team1:", this.team1)
      })
      this._teamService.getTeam(this.team2id).subscribe((value) => {
        this.team2 = value;
        //console.log("team2:", this.team2)
      })
      this._gameService.getGame(this.gameid).subscribe((value) => {
        this.game = value;
        //console.log("game", this.game)
      })
    }
    
  }

  goLive(id: number){
    this.router.navigate(['wedstrijden/live', id])
  }

}
