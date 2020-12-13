import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { CompetitionComponent } from './competition/competition/competition.component';
import { AdminRankingComponent } from './competition/admin-ranking/admin-ranking.component';
import { EditCompetitionComponent } from './competition/edit-competition/edit-competition.component';
import { AddCompetitionComponent } from './competition/add-competition/add-competition.component';
import { AddTeamComponent } from './competition/add-team/add-team.component';
import { MakeGamesComponent } from './competition/make-games/make-games.component';
import { EditGameComponent } from './competition/edit-game/edit-game.component';
import { NoAccessComponent } from './no-access/no-access.component';

// Guards
import { AuthGuard } from './security/guards/auth.guard';

import { LiveOverzichtComponent } from './wedstrijden/live-overzicht/live-overzicht.component';



const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Everyone that isn't authentiicated
  { path: 'aanmelden', component: LoginComponent },
  { path: 'registreren', component: SignupComponent },

  // Authenticated users
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
  { path: 'teamGames/:id', component: TeamGamesComponent, canActivate: [AuthGuard] },
  { path: 'wedstrijden', component: MatchComponent, canActivate: [AuthGuard] },
  { path: 'competition', component: CompetitionComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'competition/:id', component: EditCompetitionComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'addCompetition', component: AddCompetitionComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'addTeam', component: AddTeamComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'adminRanking/:id', component: AdminRankingComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'makeGames/:id', component: MakeGamesComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'editGame/:id', component: EditGameComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'wedstrijden/live/:id', component: LiveComponent, canActivate: [AuthGuard] },
  { path: 'wedstrijden/overzicht/live', component: LiveOverzichtComponent , canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'teamsadd', component: TeamsAddComponent, canActivate: [AuthGuard] }, // A user can create a new team if he hasn't one

  // Only admin and captains
  { path: 'teams', component: TeamComponent, canActivate: [AuthGuard] },
  { path: 'teamsedit', component: TeamsEditComponent, canActivate: [AuthGuard] },
  { path: 'teamscaptainedit', component: TeamCaptainEditComponent, canActivate: [AuthGuard] },
  { path: 'teamsadduser', component: TeamAddUserComponent, canActivate: [AuthGuard] },

  // Only admins can access these pages, no one else
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'edituser', component: UsersEditComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } }, // User can edit his own profile
  { path: 'adduser', component: UsersAddComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'tables', component: TablesComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'tablesadd', component: TablesAddComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },
  { path: 'tablesedit', component: TablesEditComponent, canActivate: [AuthGuard], data: { roles : ["admin"] } },

  { path: 'geen-toegang', component: NoAccessComponent }, // 403 for no allowed access
  { path: '**', component: WildcardRouteComponent }, // Wildcard route --> page not found 404

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
