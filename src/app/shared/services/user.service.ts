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
    return this.http.get<User[]>("https://localhost:44300/api/user");
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>("https://localhost:44300/api/user/" + id);
  }
  getUsersByTeamID(teamid: number): Observable<User[]>{
    return this.http.get<User[]>("https://localhost:44300/api/user/team/" + teamid);
  }

  updateUser(id: number, user: User){
    return this.http.put<User>("https://localhost:44300/api/user/" + id, user)
  }

  addUser(user: User){
    return this.http.post<User>("https://localhost:44300/api/user" , user);
  }

  deleteUser(id: number){
    return this.http.delete<User>("https://localhost:44300/api/user/" + id)
  }
}
