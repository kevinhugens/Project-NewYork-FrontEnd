import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../shared/models/team.model';
import { Competition } from '../../shared/models/competition.model';
import { TeamService } from '../../shared/services/team.service';
import { Game } from '../../shared/models/game.model';
import { GameService } from '../../shared/services/game.service';

@Component({
  selector: 'app-team-games',
  templateUrl: './team-games.component.html',
  styleUrls: ['./team-games.component.scss']
})
export class TeamGamesComponent implements OnInit {

  competition: Competition = new Competition(1, "Locatie", "Premier League");
  team1: Team;
  team2: Team= new Team(2, "The A team", "Thomas Less", "TestAdress2", "../../../assets/teamPicture2.jpg", 1)
  game: Game = new Game(1, "1v1", null, null, new Date("July 21, 2021 01:15:00"), "TEST", 1, 2, 1)
  games: Game[];


  id = this.route.snapshot.params['id'];
  constructor(private route: ActivatedRoute, private router: Router, private _teamService: TeamService, private _gameService: GameService) {
    this._teamService.getTeam(this.id).subscribe(result => {
      this.team1 = result;
    });
    this._gameService.getGames().subscribe(result=>{
      this.games = result;
    });
    console.log(this.team1)
    
  }

  ngOnInit(): void {
  }

}
