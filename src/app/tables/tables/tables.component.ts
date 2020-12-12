import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/shared/services/upload.service';
import { Table } from '../../shared/models/table.model';
import { TableService } from '../../shared/services/table.service';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  lijstTables: Table[];
  allTablePics : string[] = [];
  constructor(private router: Router, private api: TableService, private snackBar: MatSnackBar,private apiUpload : UploadService) { }

  ngOnInit(): void {
    this.updateList();
  }

  onAdd() {
    this.router.navigate(['/tablesadd']);
  }

  onEdit(table: Table) {
    if (table) {
      this.api.selectedTable = table;
      this.router.navigate(['/tablesedit']);
    } else {
      this.snackBar.open("Please select a table.", "", { duration: 5000 });
    }
  }

  onDelete(table: Table) {
    if (table) {
      this.apiUpload.deletePhoto(table.photo).subscribe();
      this.api.deleteTable(table.tableID).subscribe(() => {
        this.updateList();
      });
    } else {
      this.snackBar.open("Please select a table.", "", { duration: 5000 });
    }

  }
  updateList() {
    this.api.getTables().subscribe((result) => {
      this.lijstTables = result;
      for (let index = 0; index < this.lijstTables.length; index++) {
        const element = this.lijstTables[index];
        this.apiUpload.getPhoto(element.photo).subscribe((result) => {
          element["linkfoto"] = result;
        })
      }
    })
  }

}
