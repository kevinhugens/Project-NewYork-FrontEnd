import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { HomeComponent } from './home/home/home.component';
import { RankingComponent } from './ranking/ranking/ranking.component';
import { TeamGamesComponent } from './ranking/team-games/team-games.component';
import { LoginComponent } from './security/login/login.component';
import { SignupComponent } from './security/signup/signup.component';
import { WildcardRouteComponent } from './wildcard-route/wildcard-route.component';

import { MatchComponent } from './matches/match/match.component';
import { UsersComponent } from './users/users/users.component'
import { UsersAddComponent } from './users/users-add/users-add.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { TeamComponent } from './team/team/team.component';
import { TeamsAddComponent } from './team/teams-add/teams-add.component';
import { TeamsEditComponent } from './team/teams-edit/teams-edit.component';
import { LiveComponent } from './wedstrijden/live/live.component';

import { TeamAddUserComponent } from './team/team-add-user/team-add-user.component';
import { TeamCaptainEditComponent } from './team/team-captain-edit/team-captain-edit.component';
// Guards
import { AuthGuard } from './security/guards/auth.guard'
import { TablesComponent } from './tables/tables/tables.component';
import { TablesAddComponent } from './tables/tables-add/tables-add.component';
import { TablesEditComponent } from './tables/tables-edit/tables-edit.component';
import { ProfileComponent } from './profile/profile/profile.component';


const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'ranking', component: RankingComponent },
  { path: 'teamGames/:id', component: TeamGamesComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'aanmelden', component: LoginComponent },
  { path: 'registreren', component: SignupComponent },
  { path: 'wedstrijden', component: MatchComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'adduser', component: UsersAddComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'edituser', component: UsersEditComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'teams', component: TeamComponent },
  { path: 'teamsadd', component: TeamsAddComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'teamsedit', component: TeamsEditComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'wedstrijden/live/:id', component: LiveComponent},
  { path: 'teamsadduser', component: TeamAddUserComponent },
  { path: 'teamscaptainedit', component: TeamCaptainEditComponent },
  { path: 'tables', component: TablesComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'tablesadd', component: TablesAddComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'tablesedit', component: TablesEditComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'profile', component: ProfileComponent },

  { path: '**', component: WildcardRouteComponent }, // Wildcard route --> page not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
