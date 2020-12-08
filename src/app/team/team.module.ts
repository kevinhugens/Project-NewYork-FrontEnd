import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import {SharedModule} from '../shared/shared.module';
import { TeamsAddComponent } from './teams-add/teams-add.component';
import { TeamsEditComponent } from './teams-edit/teams-edit.component';


@NgModule({
  declarations: [TeamComponent, TeamsAddComponent, TeamsEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TeamModule { }
