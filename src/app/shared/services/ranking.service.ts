import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking } from '../models/ranking.model';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private http: HttpClient) { }

  getRankings(): Observable<Ranking[]>{
    return this.http.get<Ranking[]>("https://localhost:44300/api/ranking");
  }

  getRanking(id: number): Observable<Ranking>{
    return this.http.get<Ranking>("https://localhost:44300/api/ranking/" + id);
  }

  updateRanking(id: number, ranking: Ranking){
    return this.http.put<Ranking>("https://localhost:44300/api/ranking/" + id, ranking)
  }

  addRanking(ranking: Ranking){
    return this.http.post<Ranking>("https://localhost:44300/api/ranking" , ranking);
  }

  deleteRanking(id: number){
    return this.http.delete<Ranking>("https://localhost:44300/api/ranking/" + id)
  }
}
