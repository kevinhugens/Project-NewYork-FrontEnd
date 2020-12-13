import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { UserService } from 'src/app/shared/services/user.service';
import {
  DropzoneComponent,
  DropzoneDirective,
  DropzoneConfigInterface,
  DropzoneUrlFunction
} from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-teams-add',
  templateUrl: './teams-add.component.html',
  styleUrls: ['./teams-add.component.scss']
})
export class TeamsAddComponent implements OnInit {
  newTeam : Team = new Team(0,"","","","",null);
  lijstUsers : User[];
  selectedUser : User;
  submittedNew : boolean = false;

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

  constructor(private router: Router, private api : TeamService, 
    private apiUsers : UserService) { }

  ngOnInit(): void {
    this.getAllUsersWithoutTeam();
  }

  backToTeams() {
    this.router.navigate(["/teams"]);
  }

  getAllUsersWithoutTeam(){
    this.apiUsers.getUsersWithoutTeam().subscribe((result) => {
      result.splice(result.indexOf(result.find(x=>x.email == "admin@admin.be")),1);
      this.lijstUsers = result;
    })
  }

  onSubmitCreateTeam() {
    this.submittedNew = true;
    if(this.selectedUser){
      this.newTeam.captainID = this.selectedUser.userID;
      
    } else  {
      this.newTeam.captainID = null;
    }
    this.processQueue();
    this.newTeam.photo = this.newFilename;
    
    this.api.addTeam(this.newTeam).subscribe((result) => {
      this.submittedNew = false;
      if(this.selectedUser){
        this.selectedUser.teamID = result.teamID;
        this.apiUsers.updateUser(this.selectedUser.userID,this.selectedUser).subscribe();
      }
    });
    this.newTeam = new Team(0,"","","","",0);
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
