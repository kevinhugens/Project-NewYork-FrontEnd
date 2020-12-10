import { Observable } from 'rxjs';
import { Game } from './game.model';
import {Ranking} from './ranking.model';
export class Competition {
    constructor(public competitionID: number, public address: string, public name: string, public games?: Observable<Game>, public rankings?: Observable<Ranking>) {
   }
}
