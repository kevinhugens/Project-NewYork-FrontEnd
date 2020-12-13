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
  selector: 'app-tables-add',
  templateUrl: './tables-add.component.html',
  styleUrls: ['./tables-add.component.scss']
})
export class TablesAddComponent implements OnInit {
  newTable : Table = new Table(0,"","","","",0);
  submittedNew : boolean = false;
  lijstUsers : User[];

  @ViewChild(DropzoneComponent, {static: false })
  componentRef?: DropzoneComponent;
  dropzone: any;
  newFilename : string;
  public config : DropzoneConfigInterface = {
    url: "https://newyork-backend.azurewebsites.net/api/upload",
    acceptedFiles: "image/*",
    autoProcessQueue: false,
    maxFiles : 1
  }
  constructor(private router: Router, private api : TableService, private userApi : UserService, private apiUpload : UploadService) { }

  ngOnInit(): void {
    this.userApi.getUsers().subscribe((result) => this.lijstUsers = result);
  }
  
  backToTables(){
    this.router.navigate(["/tables"]);
  }

  onSubmitCreateTable() {
    this.submittedNew = true;
    this.processQueue();
    this.newTable.photo = this.newFilename;
    this.api.addTable(this.newTable).subscribe(() => {
      this.submittedNew = false;
    });
    this.newTable = new Table(0,"","","","",0);
  }

  processQueue() : void {
    this.dropzone = this.componentRef.directiveRef.dropzone();
    if(this.dropzone.files.length !== 0) {
      this.newFilename = this.dropzone.files[0].name;
      this.dropzone.processQueue();
    } else {
      this.newFilename = null;
      throw new Error("No file selected");
    }
  }

  onUploadError(event) : void {
    throw new Error(event[0].upload.filename + ": " + event[1].message);
  }

  removeFiles() : void {
    this.dropzone = this.componentRef.directiveRef.dropzone();
    this.dropzone.removeAllFiles(true);
  }

}
