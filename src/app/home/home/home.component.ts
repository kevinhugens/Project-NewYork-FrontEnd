import { Component, OnInit } from '@angular/core';
import {Game} from '../../shared/models/game.model';
import {Competition} from '../../shared/models/competition.model';
import {Team} from '../../shared/models/team.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  competition: Competition = new Competition(1, "Locatie", "Premier League");
  team1: Team= new Team(1, "The greatest team", "Thomas More", "TestAdress", "../../../assets/teamPicture1.jpg", 1)
  team2: Team= new Team(2, "The A team", "Thomas Less", "TestAdress2", "../../../assets/teamPicture2.jpg", 1)
  game: Game = new Game(1, "1v1", null, null, new Date("July 21, 2021 01:15:00"), "TEST", 1, 2, 1)
  constructor() { }

  ngOnInit(): void {
  }

}
