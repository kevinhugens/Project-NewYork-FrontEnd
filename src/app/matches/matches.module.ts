import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match/match.component';
import { SharedModule } from "../shared/shared.module";
import { ChallengeTeamComponent } from './challenge-team/challenge-team.component';



@NgModule({
  declarations: [MatchComponent, ChallengeTeamComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MatchesModule { }
