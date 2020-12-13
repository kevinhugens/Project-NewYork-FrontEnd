import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { WildcardRouteComponent } from './wildcard-route/wildcard-route.component';

import { HomeModule } from './home/home.module';
import { SecurityModule } from './security/security.module';
import { MatchesModule } from './matches/matches.module';
import { NavbarComponent } from './navbar/navbar.component';

import { RankingModule } from './ranking/ranking.module';
import { ProfileModule } from './profile/profile.module';
import { ChartsModule } from 'ng2-charts';

import { CompetitionModule } from './competition/competition.module';
import { UsersModule } from './users/users.module';
import { TeamModule } from './team/team.module';
import { TablesModule } from './tables/tables.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security/security.interceptor';
import { LiveComponent } from './wedstrijden/live/live.component';
import { HomeComponent } from './home/home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { LiveOverzichtComponent } from './wedstrijden/live-overzicht/live-overzicht.component';
import { AddTeamComponent } from './competition/add-team/add-team.component'

@NgModule({
  declarations: [
    AppComponent,
    WildcardRouteComponent,
    NavbarComponent,
    LiveComponent,
    SidenavComponent,
    NoAccessComponent,
    LiveOverzichtComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HomeModule,
    FlexLayoutModule,
    RankingModule,
    UsersModule,
    SecurityModule,
    HttpClientModule,
    TeamModule,
    TablesModule,
    MatchesModule,
    TeamModule,
    TeamModule,
    ProfileModule,
    ChartsModule,
    CompetitionModule,
    ChartsModule
  ],
  entryComponents: [
    AddTeamComponent
  ],
  providers: [
    {

      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
    HomeComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
