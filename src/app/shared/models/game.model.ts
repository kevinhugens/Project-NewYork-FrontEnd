import { Observable } from 'rxjs';
import { Table } from './table.model';
import { Team } from './team.model';
import { UserGame } from "./user-game.model";
export class Game {

    constructor(public gameID: number, public type: string, public scoreTeam1: number, public scoreTeam2: number, public date: Date, public address: string,
         public team1ID: number, public team2ID: number, public competitionID: number,public gameStatusID: number, public tableID: number, public table?: Table, public team1?: Team, public team2?: Team, 
         public userGames?: Observable<UserGame[]>) {
    }
}
