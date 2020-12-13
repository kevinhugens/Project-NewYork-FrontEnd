import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }

  getCompetitions(): Observable<Competition[]>{
    return this.http.get<Competition[]>("https://newyork-backend.azurewebsites.net/api/competition");
  }

  getCompetition(id: number): Observable<Competition>{
    return this.http.get<Competition>("https://newyork-backend.azurewebsites.net/api/competition/" + id);
  }

  updateCompetition(id: number, competitie: Competition){
    return this.http.put<Competition>("https://newyork-backend.azurewebsites.net/api/competition/" + id, competitie)
  }

  addCompetition(competitie: Competition){
    return this.http.post<Competition>("https://newyork-backend.azurewebsites.net/api/competition" , competitie);
  }

  deleteCompetition(id: number){
    return this.http.delete<Competition>("https://newyork-backend.azurewebsites.net/api/competition/" + id)
  }
}
