import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionComponent } from './competition/competition.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRankingComponent } from './admin-ranking/admin-ranking.component';
import { EditCompetitionComponent } from './edit-competition/edit-competition.component';
import { AddCompetitionComponent } from './add-competition/add-competition.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


@NgModule({
  declarations: [CompetitionComponent, AdminRankingComponent, EditCompetitionComponent, AddCompetitionComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
  ]
})
export class CompetitionModule { }
