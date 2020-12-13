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
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-team-captain-edit',
  templateUrl: './team-captain-edit.component.html',
  styleUrls: ['./team-captain-edit.component.scss']
})
export class TeamCaptainEditComponent implements OnInit {
  team : Team;
  selectedCaptain : User;
  submitted : boolean = false;
  lijstUsersTeam : User[];

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
  
  constructor(private router: Router, private api : TeamService, private userApi : UserService,
    private apiUpload : UploadService) { }

  ngOnInit(): void {
    this.team = this.api.selectedTeam;
    this.apiUpload.getPhoto(this.team.photo).subscribe((result) => {
      this.teampic = result;
    })
    this.userApi.getUsersByTeamID(this.team.teamID).subscribe((result) => {
      this.lijstUsersTeam = result;
    });
  }

  backToTeams() {
    this.router.navigate(["/teams"]);
  }

  onSubmitUpdateTeam() {
    this.submitted = true;
    this.processQueue();
    if(this.newFilename!=null){
      this.apiUpload.deletePhoto(this.team.photo).subscribe();
      this.team.photo = this.newFilename;
    }
    this.api.updateTeam(this.team.teamID,this.team).subscribe(() => {
      this.router.navigate(["/teams"]);
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
