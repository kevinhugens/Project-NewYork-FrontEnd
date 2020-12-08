import { User } from './user.model';

export class Table {
    constructor(public tableID: number, public tableName: string, public companyName: string, public address: string,
        public photo: string, public managerID: number, public manager?: User){

    }
}
