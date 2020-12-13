import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import {
  DropzoneComponent,
  DropzoneDirective,
  DropzoneConfigInterface,
  DropzoneUrlFunction
} from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.scss']
})
export class TeamsEditComponent implements OnInit {
  selectedTeam : Team;
  submittedSelected : boolean = false;
  usersByTeamID : User[];
  usersZonderTeam: User[];
  selectedUser : User;

  @ViewChild(DropzoneComponent, {static: false })
  componentRef?: DropzoneComponent;
  dropzone: any;
  newFilename : string;
  teampic : string;
  public config : DropzoneConfigInterface = {
    url: "https://newyork-backend.azurewebsites.net/api/upload",
    acceptedFiles: "image/*",
    autoProcessQueue: false,
    maxFiles : 1
  }
  
  constructor(private router: Router, private apiTeams : TeamService, private apiUsers : UserService,
    private apiUpload : UploadService) { }

  ngOnInit(): void {
    this.selectedTeam = this.apiTeams.selectedTeam;
    this.apiUpload.getPhoto(this.selectedTeam.photo).subscribe((result) => {
      this.teampic = result;
    })
    this.apiUsers.getUsersByTeamID(this.selectedTeam.teamID).subscribe((result) => {
      this.usersByTeamID = result;
      if(result.length == 0){
        this.getAllUsersWithoutTeam();
      }
    });
  }

  backToTeams() {
    this.router.navigate(["/teams"]);
  }

  onSubmitUpdateTeam() {
    if(this.selectedUser){
      this.selectedTeam.captainID = this.selectedUser.userID;
      this.selectedUser.teamID = this.selectedTeam.teamID;
      this.apiUsers.updateUser(this.selectedUser.userID,this.selectedUser).subscribe();
    }
    this.processQueue();
    if(this.newFilename!=null){
      this.apiUpload.deletePhoto(this.selectedTeam.photo).subscribe();
      this.selectedTeam.photo = this.newFilename;
    }
    this.submittedSelected = true;
    this.apiTeams.updateTeam(this.selectedTeam.teamID,this.selectedTeam).subscribe(() => {
      this.router.navigate(["/teams"]);
    });
    
  }

  getAllUsersWithoutTeam(){
    this.apiUsers.getUsersWithoutTeam().subscribe((result) => {
      result.splice(result.indexOf(result.find(x=>x.email == "admin@admin.be")),1);
      this.usersZonderTeam = result;
    })
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
