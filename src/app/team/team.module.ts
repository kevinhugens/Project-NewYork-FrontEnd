import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
import {SharedModule} from '../shared/shared.module';
import { TeamsAddComponent } from './teams-add/teams-add.component';
import { TeamsEditComponent } from './teams-edit/teams-edit.component';
import { TeamAddUserComponent } from './team-add-user/team-add-user.component';
import { TeamCaptainEditComponent } from './team-captain-edit/team-captain-edit.component';


@NgModule({
  declarations: [TeamComponent, TeamsAddComponent, TeamsEditComponent, TeamAddUserComponent, TeamCaptainEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TeamModule { }
