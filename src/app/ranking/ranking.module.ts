import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking/ranking.component';
import { RankingService } from '../shared/services/ranking.service';
import { TeamService } from '../shared/services/team.service';
import { GameService } from '../shared/services/game.service';
import { SharedModule } from '../shared/shared.module';
import { TeamGamesComponent } from './team-games/team-games.component';



@NgModule({
  declarations: [RankingComponent, TeamGamesComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [RankingService, TeamService, GameService]

})
export class RankingModule { }
