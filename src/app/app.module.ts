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
import { NavbarComponent } from './navbar/navbar.component';
import { UsersModule } from './users/users.module';
import { TeamModule } from './team/team.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security/security.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    WildcardRouteComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HomeModule,
    FlexLayoutModule,
    UsersModule,
    SecurityModule,
    HttpClientModule,
    TeamModule
  ],
  providers: [    
    {
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
