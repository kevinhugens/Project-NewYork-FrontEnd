import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/security/services/authenticate.service';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  lijstTeams: Team[];
  activeUser: User;
  team: Team;
  isAdmin: boolean = false;
  isCaptain: boolean = false;
  noTeamJoined: boolean = false;
  lijstUsersVanTeam: User[];

  constructor(private router: Router, private api: TeamService, private authApi: AuthenticateService,
    private userApi: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authApi.loggedUser.subscribe((result) => {
      this.activeUser = result;
      if (result.role == "admin") {
        this.isAdmin = true;
        this.api.getTeams().subscribe((result) => {
          this.lijstTeams = result;
        });
      } else if (result.teamID != null) {
        this.api.getTeam(this.activeUser.teamID).subscribe((result) => {
          this.team = result;
          this.checkIfCaptain();
        });
      } else {
        this.noTeamJoined = true;
      }
    });
  }
  onAdminAdd() {
    this.router.navigate(["/teamsadd"]);
  }
  onAdminEdit(team: Team) {
    if (team) {
      this.api.selectedTeam = team;
      this.router.navigate(["/teamsedit"]);
    } else {
      this.snackBar.open("Please select a team.", "", { duration: 5000 });
    }
  }
  onAdminDelete(team: Team) {
    if (team) {
      this.snackBar.open("Team leegmaken en verwijderen.", "", { duration: 5000 });
      this.userApi.getUsersByTeamID(team.teamID).subscribe((result) => {
        if (result.length > 0) {
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            element.teamID = null;
            this.userApi.updateUser(element.userID, element).subscribe();
          }
        }
        this.api.deleteTeam(team.teamID).subscribe(() => {
          this.api.getTeams().subscribe((result) => this.lijstTeams = result);
        });
      })

    } else {
      this.snackBar.open("Please select a team.", "", { duration: 5000 });
    }
  }

  onCaptainAddUserToTeam() {
    this.router.navigate(["/teamsadduser"]);
  }

  onCaptainEditTeam() {
    this.api.selectedTeam = this.team;
    this.router.navigate(["/teamscaptainedit"]);
  }

  onCaptainDeleteFromTeam(user: User) {
    if (user) {
      this.userApi.deleteUserFromTeam(user.userID).subscribe(() => {
        this.checkIfCaptain();
      });
    } else {
      this.snackBar.open("Please select a user.", "", { duration: 5000 });
    }
  }

  checkIfCaptain() {
    if (this.team.captainID == this.activeUser.userID) {
      this.isCaptain = true;
    }
    this.userApi.getUsersByTeamID(this.team.teamID).subscribe((result) => {
      this.lijstUsersVanTeam = result;
    });
  }
}
