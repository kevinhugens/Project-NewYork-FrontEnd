import { User } from './user.model';

export class UserGame {
    constructor(public userGameID: number, public userID: number, public gameID: number, public player?: User){

    }
}
