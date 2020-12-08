import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './security/login/login.component';
import { SignupComponent } from './security/signup/signup.component';
import { WildcardRouteComponent } from './wildcard-route/wildcard-route.component';

import { MatchComponent } from './matches/match/match.component';
import { UsersComponent } from './users/users/users.component'
import { UsersAddComponent } from './users/users-add/users-add.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import {TeamComponent} from './team/team/team.component';

// Guards
import { AuthGuard } from './security/guards/auth.guard'
import { TeamsAddComponent } from './team/teams-add/teams-add.component';
import { TeamsEditComponent } from './team/teams-edit/teams-edit.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'aanmelden', component: LoginComponent },
  { path: 'registreren', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'wedstrijden', component: MatchComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent },
  { path: 'adduser', component: UsersAddComponent },
  { path: 'edituser', component: UsersEditComponent },
  { path: 'teams', component: TeamComponent },
  { path: 'teamsadd', component: TeamsAddComponent },
  { path: 'teamsedit', component: TeamsEditComponent },

  { path: '**', component: WildcardRouteComponent }, // Wildcard route --> page not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
