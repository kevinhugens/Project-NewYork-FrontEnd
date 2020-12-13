import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Competition } from '../models/competition.model';
import { Ranking } from '../models/ranking.model';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  selectedCompetion: Competition;

  constructor(private http: HttpClient) { }

  getRankings(): Observable<Ranking[]>{
    return this.http.get<Ranking[]>("https://newyork-backend.azurewebsites.net/api/ranking");
  }

  getRanking(id: number): Observable<Ranking>{
    return this.http.get<Ranking>("https://newyork-backend.azurewebsites.net/api/ranking/" + id);
  }

  getRankingByTeam(id: number): Observable<Ranking>{
    return this.http.get<Ranking>("https://newyork-backend.azurewebsites.net/api/ranking/team/" + id);
  }

  updateRanking(id: number, ranking: Ranking){
    return this.http.put<Ranking>("https://newyork-backend.azurewebsites.net/api/ranking/" + id, ranking)
  }

  addRanking(ranking: Ranking){
    return this.http.post<Ranking>("https://newyork-backend.azurewebsites.net/api/ranking" , ranking);
  }

  deleteRanking(id: number){
    return this.http.delete<Ranking>("https://newyork-backend.azurewebsites.net/api/ranking/" + id)
  }
}
