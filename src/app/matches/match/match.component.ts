import { Component, OnInit } from '@angular/core';
import { Game } from '../../shared/models/game.model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  games : Game[];

constructor(){}

  // constructor(private _gameService: GameService) {
  //   this._gameService.getGames()
  //   .pipe(
  //     map(games => games.filter(game => article.articleStatusID === 1)), // Only get the aricles ready for publication
  //     tap(t => console.log("Get Articles tap:", t))
  //   )
  //   .subscribe(
  //   result => {
  //     this.articles = result;
  //   });
  //  }

  ngOnInit(): void {
  }

}
