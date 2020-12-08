import { Observable } from 'rxjs';
import {User} from "./user.model";
export class Team {
    constructor(public teamID: number, public teamName: string, public companyName: string, public address: string, public photo: string, public captainID: number, public teamMembers?: Observable<User>) {
   }
}
