import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser : User = null;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>("https://newyork-backend.azurewebsites.net/api/user");
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>("https://newyork-backend.azurewebsites.net/api/user/" + id);
  }

  getUsersWithoutTeam(): Observable<User[]> {
    return this.http.get<User[]>("https://newyork-backend.azurewebsites.net/api/user/team");
  }
  
  getUsersByTeamID(teamid: number): Observable<User[]>{
    return this.http.get<User[]>("https://newyork-backend.azurewebsites.net/api/user/team/" + teamid);
  }

  updateUser(id: number, user: User){
    return this.http.put<User>("https://newyork-backend.azurewebsites.net/api/user/" + id, user)
  }

  addUser(user: User){
    return this.http.post<User>("https://newyork-backend.azurewebsites.net/api/user" , user);
  }

  deleteUser(id: number){
    return this.http.delete<User>("https://newyork-backend.azurewebsites.net/api/user/" + id)
  }
  deleteUserFromTeam(userid: number) {
    return this.http.delete<User>("https://newyork-backend.azurewebsites.net/api/user/team/" + userid)
  }
}
