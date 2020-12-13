import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  
  getPhoto(filename : string) : any {
    return this.http.get<any>("https://newyork-backend.azurewebsites.net/api/upload/" +filename);
  }
  deletePhoto(filename : string) : any {
    return this.http.delete<any>("https://newyork-backend.azurewebsites.net/api/upload/" +filename);
  }
  updateUserProfilePicture(filename : string, user : User) {
    return this.http.put<any>("https://newyork-backend.azurewebsites.net/api/user/updateprofilepicture/" +filename,user);
  }
}
