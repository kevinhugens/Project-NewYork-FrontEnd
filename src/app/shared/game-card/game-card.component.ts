import { Component, Input, OnInit } from '@angular/core';
import {Game} from '../models/game.model';
import {Competition} from '../models/competition.model';
import {Team} from '../models/team.model';
@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() competition: Competition;
  @Input() team1: Team;
  @Input() team2: Team;
  @Input() game: Game;
  @Input() latest: boolean;

  constructor() { }

  ngOnInit(): void {
    console.log("game", this.game)
  }

}
