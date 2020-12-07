export class Game {
    constructor(public gameID: number, public type: string, public scoreTeam1: number, public scoreTeam2: number, public date: Date, public address: string,
         public team1ID: number, public team2ID: number, public competitionID: number) {
    }
}
