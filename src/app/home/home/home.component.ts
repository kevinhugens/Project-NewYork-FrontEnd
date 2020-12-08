import { Component, OnInit } from '@angular/core';
import {Game} from '../../shared/models/game.model';
import {Competition} from '../../shared/models/competition.model';
import {Team} from '../../shared/models/team.model';
import {CompetitionService} from '../../shared/services/competition.service';
import {GameService} from '../../shared/services/game.service';
import { TeamService } from 'src/app/shared/services/team.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  competition: Competition;
  team1: Team= new Team(1, "The greatest team", "Thomas More", "TestAdress", "../../../assets/teamPicture1.jpg", 1)
  team2: Team= new Team(2, "The A team", "Thomas Less", "TestAdress2", "../../../assets/teamPicture2.jpg", 1)

  game: Game = new Game(1, "1v1", null, null, new Date("July 21, 2021 01:15:00"), 1, 1, 2, 1)

  constructor(private _competitionService: CompetitionService, private _gameService: GameService, private _teamService: TeamService ) { 
    
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void{
    //this._teamService.getTeam(user.teamid).subscribe(value => console.log(value))
    this._competitionService.getCompetition(1).subscribe(value => this.competition = value);
    this._gameService.getGames().subscribe(value => console.log("games value", value))
    
  }
}
