import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match/match.component';
import { SharedModule } from "../shared/shared.module";
import { ChallengeTeamComponent } from './challenge-team/challenge-team.component';
import { CreatedMatchDialogComponent } from './challenge-team/created-match-dialog/created-match-dialog.component';
import { OpenChallengesComponent } from './open-challenges/open-challenges.component';



@NgModule({
  declarations: [MatchComponent, ChallengeTeamComponent, CreatedMatchDialogComponent, OpenChallengesComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MatchesModule { }
