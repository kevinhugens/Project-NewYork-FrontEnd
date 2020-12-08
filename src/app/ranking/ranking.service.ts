import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ranking } from '../shared/models/ranking.model';
import { Team } from '../shared/models/team.model';


@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient) { }

  getRankings(): Observable<Ranking[]>{
    return this.http.get<Ranking[]>("https://localhost:44300/api/Ranking");
  }

  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>("https://localhost:44300/api/Team");
  }

  getTeam(id){
    return this.http.get("https://localhost:44300/api/Team/" + id);
  }


}
