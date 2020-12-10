import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'src/app/shared/models/table.model';
import { User } from 'src/app/shared/models/user.model';
import { TableService } from 'src/app/shared/services/table.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-tables-edit',
  templateUrl: './tables-edit.component.html',
  styleUrls: ['./tables-edit.component.scss']
})
export class TablesEditComponent implements OnInit {
  selectedTable : Table;
  lijstUsers : User[];
  constructor(private router: Router, private api : TableService, private userApi : UserService) { }

  ngOnInit(): void {
    this.selectedTable = this.api.selectedTable;
    this.userApi.getUsers().subscribe((result) => this.lijstUsers = result);
  }

  backToTables(){
    this.router.navigate(["/tables"]);
  }

  onSubmitUpdateTable() {
    this.api.updateTable(this.selectedTable.tableID, this.selectedTable).subscribe(() => {
      this.router.navigate(["/tables"]);
    });
  }

}
