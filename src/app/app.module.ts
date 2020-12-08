import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { WildcardRouteComponent } from './wildcard-route/wildcard-route.component';

import { HomeModule } from './home/home.module';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersModule } from './users/users.module';


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
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
