import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'src/app/shared/models/table.model';
import { User } from 'src/app/shared/models/user.model';
import { TableService } from 'src/app/shared/services/table.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-tables-add',
  templateUrl: './tables-add.component.html',
  styleUrls: ['./tables-add.component.scss']
})
export class TablesAddComponent implements OnInit {
  newTable : Table = new Table(0,"","","","",0);
  submittedNew : boolean = false;
  lijstUsers : User[];
  constructor(private router: Router, private api : TableService, private userApi : UserService) { }

  ngOnInit(): void {
    this.userApi.getUsers().subscribe((result) => this.lijstUsers = result);
  }
  
  backToTables(){
    this.router.navigate(["/tables"]);
  }

  onSubmitCreateTable() {
    this.submittedNew = true;
    this.api.addTable(this.newTable).subscribe(() => {
      this.submittedNew = false;
    });
    this.newTable = new Table(0,"","","","",0);
  }

}
