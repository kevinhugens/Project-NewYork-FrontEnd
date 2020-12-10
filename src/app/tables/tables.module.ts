import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import { TablesAddComponent } from './tables-add/tables-add.component';
import { TablesEditComponent } from './tables-edit/tables-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TablesComponent, TablesAddComponent, TablesEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TablesModule { }
