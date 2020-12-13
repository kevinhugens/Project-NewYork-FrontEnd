import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from 'src/app/shared/models/competition.model';
import { Game } from 'src/app/shared/models/game.model';
import { Ranking } from 'src/app/shared/models/ranking.model';
import { Team } from 'src/app/shared/models/team.model';
import { CompetitionService } from 'src/app/shared/services/competition.service';
import { GameService } from 'src/app/shared/services/game.service';
import { RankingService } from 'src/app/shared/services/ranking.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { AddTeamComponent } from '../add-team/add-team.component';


@Component({
  selector: 'app-admin-ranking',
  templateUrl: './admin-ranking.component.html',
  styleUrls: ['./admin-ranking.component.scss']
})
export class AdminRankingComponent implements OnInit {
  rankings: Ranking[] = [];
  teams: Team[];
  teams2: Team[] = [];
  rankLength: number;
  competition: Competition;
  game: Game = new Game(0, "1v1", 0, 0, new Date(), null, null, null, 1, 1);
  games: Game[] = [];
  teamIDs: number[] = [];
  fileNameDialogRef: MatDialogRef<AddTeamComponent>;

    //confirmation
    popoverTitle = 'Wedstrijden aanmaken';
    popoverMessage = 'Wat is het type wedstrijd binnen de competitie?';
    confirmClicked = false;
    cancelClicked = false;

  id = this.route.snapshot.params['id'];
  constructor(private router: Router, private _rankingService: RankingService, private _teamService: TeamService, private route: ActivatedRoute,
    private _competitionService: CompetitionService,private dialog: MatDialog, private _gameService: GameService, private snackbar: MatSnackBar) {
    

    this._competitionService.getCompetition(this.id).subscribe(result => {
      this.competition = result;
      this.getGames();
    });

  }

  ngOnInit(): void {
    this.getTeams();
    this.getData();
    
  }

  getGames() {
    this._gameService.getGames().subscribe(result => {
      result.map(res => {
        if (res.competitionID == this.competition.competitionID) {
          this.games.push(res);
          console.log(this.games)
        }
      })
    })
  }

  onAdd(competition: Competition) {
    this._rankingService.selectedCompetion = competition;
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = false;
    // let dialogref2 = this.dialog.open(AddTeamComponent, dialogConfig);
    let ref = this.dialog.open(AddTeamComponent);
    ref.afterClosed().subscribe(result=>{
      this._teamService.getTeam(result.team).subscribe(res=>{
        this.teams.push(res)
        console.log(this.teams)
      });
      this.rankings = [];
      this.getData();
      console.log(result)
    })

    // this.router.navigate(['addTeam']);
  }

  getData(){
    this._rankingService.getRankings().subscribe(result => {
      result.map(res => {
        if (res.competitionID == this.id) {
          this.teamIDs.push(res.teamID);
          this.rankings.push(res);
          this.rankings.sort((a, b) => b.points - a.points);
          this.rankLength = this.rankings.length;
          for (let i = 0; i < this.rankLength; i++) {
            this.rankings[i]["rank"] = i + 1;
          }
        }
      });
    });
    this._teamService.getTeams().subscribe(result => {
      this.teams = result;
    });
  }

  getTeams() {
    this._teamService.getTeams().subscribe(result => {
      result.map(res => {
        if (this.teamIDs.includes(res.teamID)) {
          this.teams2.push(res);
        }
      });
      console.log(this.teams2)
    });
  }

  onePersonComp(competition : Competition){
    this.game.type = "1vs1";
    this.makeGames(competition);
  }

  twoPersonComp(competition : Competition){
    this.game.type = "2vs2";
    this.makeGames(competition);
  }

  makeGames(competition: Competition) {
    if(this.rankings.length<2){
      this.snackbar.open("Er moeten minstens 2 teams in een competitie aanwezig zijn", "", { duration: 5000 });
    }else{
      for (let i = 0; i < this.teams2.length; i += 0) {
      for (let j = 0; j < this.teams2.length; j++) {
        if (j + 1 < this.teams2.length) {
          console.log(this.teams2[i].teamID + "vs" + this.teams2[j + 1].teamID);
          //eerste matchen
          this.game.team1ID = this.teams2[i].teamID;
          this.game.team2ID = this.teams2[j + 1].teamID;
          this.game.competitionID = competition.competitionID;
          this._gameService.addGame(this.game).subscribe(() => {
            this._gameService.getGames().subscribe(result => {
              this.games = result;
            })
          });
          console.log(this.teams2[j + 1].teamID + "vs" + this.teams2[i].teamID);
          //terugmatchen
          this.game.team2ID = this.teams2[i].teamID;
          this.game.team1ID = this.teams2[j + 1].teamID;
          this.game.competitionID = competition.competitionID;
          this._gameService.addGame(this.game).subscribe(() => {
            this._gameService.getGames().subscribe(result => {
              this.games = result;
            })
          });

        }
      }
      this.teams2 = this.teams2.slice(1);
    }
    this.router.navigate(['makeGames/' + this.id]);
    }
    
  }

  viewGames() {
    this.router.navigate(['makeGames/' + this.id]);
  }

  backToCompetitions() {
    this.router.navigate(["competition"]);
  }
}
