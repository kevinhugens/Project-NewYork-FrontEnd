import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { HomeComponent } from './home/home/home.component';
import { RankingComponent } from './ranking/ranking/ranking.component';
import { TeamGamesComponent } from './ranking/team-games/team-games.component';
import { LoginComponent } from './security/login/login.component';
import { SignupComponent } from './security/signup/signup.component';
import { WildcardRouteComponent } from './wildcard-route/wildcard-route.component';

// Guards
import { AuthGuard } from './security/guards/auth.guard'

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'ranking', component: RankingComponent },
  { path: 'teamGames/:id', component: TeamGamesComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'aanmelden', component: LoginComponent },
  { path: 'registreren', component: SignupComponent },


  { path: '**', component: WildcardRouteComponent }, // Wildcard route --> page not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
