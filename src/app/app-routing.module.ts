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

import { TablesComponent } from './tables/tables/tables.component';
import { TablesAddComponent } from './tables/tables-add/tables-add.component';
import { TablesEditComponent } from './tables/tables-edit/tables-edit.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { NoAccessComponent } from './no-access/no-access.component';
// Guards
import { AuthGuard } from './security/guards/auth.guard'
import { AdminGuard } from './security/guards/admin-guard.guard'

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Everyone that isn't authentiicated
  { path: 'adduser', component: UsersAddComponent },
  { path: 'aanmelden', component: LoginComponent },
  { path: 'registreren', component: SignupComponent },

  // Authenticated users
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'teamGames/:id', component: TeamGamesComponent, canActivate: [AuthGuard] },
  { path: 'wedstrijden', component: MatchComponent, canActivate: [AuthGuard] },
  { path: 'wedstrijden/live/:id', component: LiveComponent, canActivate: [AuthGuard] },
  { path: 'edituser', component: UsersEditComponent, canActivate: [AuthGuard] }, // User can edit his own profile
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'teamsadd', component: TeamsAddComponent, canActivate: [AuthGuard] }, // A user can create a new team if he hasn't one

  // Wie moet aan deze pagina's kunnen???????????????????????
  { path: 'teamscaptainedit', component: TeamCaptainEditComponent },
  { path: 'teamsadduser', component: TeamAddUserComponent },

  // Only admin and captains
  { path: 'teams', component: TeamComponent },
  { path: 'teamsedit', component: TeamsEditComponent },

  // Only admins can access these pages, no one else
  { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
  { path: 'tables', component: TablesComponent, canActivate: [AdminGuard] },
  { path: 'tablesadd', component: TablesAddComponent, canActivate: [AdminGuard] },
  { path: 'tablesedit', component: TablesEditComponent, canActivate: [AdminGuard] },

  { path: 'geen-toegang', component: NoAccessComponent }, // 403 for no allowed access
  { path: '**', component: WildcardRouteComponent }, // Wildcard route --> page not found 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
