import { Component, OnInit, ViewChild } from '@angular/core';
import { Color } from 'ng2-charts';
import { UserGame } from 'src/app/shared/models/user-game.model';
import { User } from 'src/app/shared/models/user.model';
import { GameService } from 'src/app/shared/services/game.service';
import { UserGameService } from 'src/app/shared/services/user-game.service';
import { AuthenticateService } from '../../security/services/authenticate.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import {
  DropzoneComponent,
  DropzoneDirective,
  DropzoneConfigInterface,
  DropzoneUrlFunction
} from 'ngx-dropzone-wrapper';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  activeUser: User;
  userGames: UserGame[];
  playedGames: number = 0;
  wonGames: number = 0;
  lostGames: number = 0;
  gameIdsWonByTeam: number[] = [];

  @ViewChild(DropzoneComponent, { static: false })
  componentRef?: DropzoneComponent;
  dropzone: any;
  newFilename: string;
  profilepic: string;
  changepic: boolean = false;
  public config: DropzoneConfigInterface = {
    url: "https://localhost:44300/api/upload",
    acceptedFiles: "image/*",
    autoProcessQueue: false,
    maxFiles: 1
  }

  //ChartSettings
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      onClick: (e) => e.stopPropagation()
    },
  };
  public pieChartLabels: string[] = ['Gewonnen', 'Verloren'];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';
  public pieChartColors: Color[] = [
    {
      backgroundColor: ['rgb(50, 255, 128)', 'rgb(252, 62, 62)'],
    },
  ];

  constructor(private router: Router, private _authenticateService: AuthenticateService, private _userGameService: UserGameService,
    private _gameService: GameService, private apiUpload: UploadService, private apiUser: UserService) {
    this._authenticateService.loggedUser.subscribe(result => {
      this.activeUser = result;
      //console.log(this.activeUser);
      this.updateProfilePicture();
    });
    this._gameService.getGames().subscribe(result => {
      result.map(res => {
        if (res.team1ID == this.activeUser.teamID && res.scoreTeam1 > res.scoreTeam2) {
          this.gameIdsWonByTeam.push(res.gameID);
        } else if (res.team2ID == this.activeUser.teamID && res.scoreTeam2 > res.scoreTeam1) {
          this.gameIdsWonByTeam.push(res.gameID);
        }
      });
    });
    //console.log(this.gameIdsWonByTeam);
  }

  ngOnInit(): void {
    this.updateProfilePicture();
    this.checkPlayedGames();
  }
  
    checkWonGame() {
      this._userGameService.getUserGames().subscribe(result => {
        this.userGames = result;
        result.map(res => {
          if (res.userID == this.activeUser.userID) {
            if (this.gameIdsWonByTeam.includes(res.gameID)) {
              this.wonGames += 1;
            }
          }
        });
        this.makeChart();
      });
    }
  
    checkPlayedGames(){
      this._userGameService.getUserGames().subscribe(result => {
        this.userGames = result;
        result.map(res => {
          if (res.userID == this.activeUser.userID) {
            this.playedGames += 1;
          }
        });
      });
      this.checkWonGame();
    }
  
    makeChart(){
      this.lostGames = this.playedGames-this.wonGames;
      this.pieChartData = [this.wonGames, this.lostGames]
    }

    changeProfilePicBtn() {
      if(this.changepic){
        this.changepic = false;
      } else {
        this.changepic = true;
      }
    }
  
    onChangeProfilePic() {
      this.processQueue();
      if(this.newFilename != null){
        this.apiUpload.deletePhoto(this.activeUser.photo).subscribe();
        this.activeUser.photo = this.newFilename;
      }
      this.apiUpload.updateUserProfilePicture(this.activeUser.photo,this.activeUser).subscribe(() => {
        this._authenticateService.logUser(this.activeUser);
        localStorage.setItem("currentUser", JSON.stringify(this.activeUser));
        this.updateProfilePicture();
        this.changeProfilePicBtn();
      });
      
    }
    processQueue(): void {
      this.dropzone = this.componentRef.directiveRef.dropzone();
      if (this.dropzone.files.length !== 0) {
        this.newFilename = this.dropzone.files[0].name;
        this.dropzone.processQueue();
      } else {
        this.newFilename = null;
      }
    }
  
    onUploadError(event): void {
      //console.log(event[0].upload.filename + ": " + event[1].message);
    }
  
    removeFiles(): void {
      this.dropzone = this.componentRef.directiveRef.dropzone();
      this.dropzone.removeAllFiles(true);
    }
  
    updateProfilePicture() {
      this.apiUpload.getPhoto(this.activeUser.photo).subscribe((result) => {
        this.profilepic = result;
      });
    }
}
