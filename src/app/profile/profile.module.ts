import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticateService } from '../security/services/authenticate.service';
import { SharedModule } from '../shared/shared.module';
import { UserGameService } from '../shared/services/user-game.service';
import { GameService } from '../shared/services/game.service';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule
  ],
  providers:[AuthenticateService, UserGameService, GameService]
})
export class ProfileModule { }
