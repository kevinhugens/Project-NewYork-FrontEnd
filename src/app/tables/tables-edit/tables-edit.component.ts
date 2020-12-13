import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'src/app/shared/models/table.model';
import { User } from 'src/app/shared/models/user.model';
import { TableService } from 'src/app/shared/services/table.service';
import { UserService } from 'src/app/shared/services/user.service';
import {
  DropzoneComponent,
  DropzoneDirective,
  DropzoneConfigInterface,
  DropzoneUrlFunction
} from 'ngx-dropzone-wrapper';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-tables-edit',
  templateUrl: './tables-edit.component.html',
  styleUrls: ['./tables-edit.component.scss']
})
export class TablesEditComponent implements OnInit {
  selectedTable : Table;
  lijstUsers : User[];

  @ViewChild(DropzoneComponent, {static: false })
  componentRef?: DropzoneComponent;
  dropzone: any;
  newFilename : string;
  tablepic : string;
  public config : DropzoneConfigInterface = {
    url: "https://localhost:44300/api/upload",
    acceptedFiles: "image/*",
    autoProcessQueue: false,
    maxFiles : 1
  }
  
  constructor(private router: Router, private api : TableService, private userApi : UserService, private apiUpload : UploadService) { }

  ngOnInit(): void {
    this.selectedTable = this.api.selectedTable;
    this.userApi.getUsers().subscribe((result) => this.lijstUsers = result);
    this.apiUpload.getPhoto(this.selectedTable.photo).subscribe((result) => {
      this.tablepic = result;
    });
  }

  backToTables(){
    this.router.navigate(["/tables"]);
  }

  onSubmitUpdateTable() {
    this.processQueue();
    if(this.newFilename!=null){
      this.apiUpload.deletePhoto(this.selectedTable.photo).subscribe();
      this.selectedTable.photo = this.newFilename;
    }
    this.api.updateTable(this.selectedTable.tableID, this.selectedTable).subscribe(() => {
      this.router.navigate(["/tables"]);
    });
  }

  processQueue() : void {
    this.dropzone = this.componentRef.directiveRef.dropzone();
    if(this.dropzone.files.length !== 0) {
      this.newFilename = this.dropzone.files[0].name;
      this.dropzone.processQueue();
    } else {
      this.newFilename = null;
    }
  }

  onUploadError(event) : void {
    //console.log(event[0].upload.filename + ": " + event[1].message);
  }

  removeFiles() : void {
    this.dropzone = this.componentRef.directiveRef.dropzone();
    this.dropzone.removeAllFiles(true);
  }

}
