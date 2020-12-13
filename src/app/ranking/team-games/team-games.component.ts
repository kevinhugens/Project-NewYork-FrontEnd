import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../shared/models/team.model';
import { TeamService } from '../../shared/services/team.service';
import { Game } from '../../shared/models/game.model';
import { GameService } from '../../shared/services/game.service';
import { CompetitionService } from '../../shared/services/competition.service';

@Component({
  selector: 'app-team-games',
  templateUrl: './team-games.component.html',
  styleUrls: ['./team-games.component.scss']
})
export class TeamGamesComponent implements OnInit {

  team1: Team;
  games: Game[];


  id = this.route.snapshot.params['id'];
  constructor(private route: ActivatedRoute, private router: Router, private _teamService: TeamService, private _gameService: GameService, private _competitionService: CompetitionService) {
    this._teamService.getTeam(this.id).subscribe(result => {
      this.team1 = result;
    });
    this._gameService.getGames().subscribe(result=>{
      this.games = result;
    });
    //console.log(this.team1)
    
  }

  ngOnInit(): void {
  }

}
