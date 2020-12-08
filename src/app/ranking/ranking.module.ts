import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingComponent } from './ranking/ranking.component';
import { RankingService } from './ranking.service';
import { SharedModule } from '../shared/shared.module';
import { TeamGamesComponent } from './team-games/team-games.component';



@NgModule({
  declarations: [RankingComponent, TeamGamesComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [RankingService]

})
export class RankingModule { }
