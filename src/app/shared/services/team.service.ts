import { HttpClient } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  selectedTeam : Team;
  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>("https://newyork-backend.azurewebsites.net/api/team");
  }

  getTeam(id: number): Observable<Team>{
    //console.log("GET TEAMID", id)
    return this.http.get<Team>("https://localhost:44300/api/Team/" + id);
  }

  updateTeam(id: number, team: Team){
    return this.http.put<Team>("https://localhost:44300/api/team/" + id, team)
  }

  addTeam(team: Team){
    return this.http.post<Team>("https://localhost:44300/api/team" , team);
  }

  deleteTeam(id: number){
    return this.http.delete<Team>("https://localhost:44300/api/team/" + id)
  }
}
