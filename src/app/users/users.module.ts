import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, UsersAddComponent, UsersEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UsersModule { }
