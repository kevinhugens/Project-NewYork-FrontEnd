import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>("https://newyork-backend.azurewebsites.net/api/game");
  }

  getGamesByTeam(teamid: number): Observable<Game[]>{
    return this.http.get<Game[]>("https://newyork-backend.azurewebsites.net/api/game/gamesbyteam/" + teamid);
  }

  getLiveGames(): Observable<Game[]>{
    return this.http.get<Game[]>("https://newyork-backend.azurewebsites.net/api/game/live");
  }

  getNextGamesByTeam(teamid: number): Observable<Game[]>{
    return this.http.get<Game[]>("https://newyork-backend.azurewebsites.net/api/game/nextgamesbyteam/" + teamid);
  }


  GetNextCompetitionGame(): Observable<Game>{
    return this.http.get<Game>("https://newyork-backend.azurewebsites.net/api/game/competition/next");
  }

  GetNextCompetitionGameByTeam(teamid: number): Observable<Game>{
    return this.http.get<Game>("https://newyork-backend.azurewebsites.net/api/game/competition/next/" + teamid);
  }


  GetNextFriendlyGame(): Observable<Game>{
    return this.http.get<Game>("https://newyork-backend.azurewebsites.net/api/game/friendly/next");
  }

  GetNextFriendlyGameByTeam(teamid: number): Observable<Game>{
    return this.http.get<Game>("https://newyork-backend.azurewebsites.net/api/game/friendly/next/" + teamid);
  }

  // The next game for an user his team
  GetNextFriendlyGameUser(teamID: number): Observable<Game>{
    return this.http.get<Game>("https://newyork-backend.azurewebsites.net/api/game/friendly/next/user/" + teamID.toString());
  }

  GetPlannedFriendlyTeamGames(teamID: number): Observable<Game[]>{
    return this.http.get<Game[]>("https://newyork-backend.azurewebsites.net/api/game/friendly/planned/team/" + teamID.toString());
  }

  GetPlayedFriendlyTeamGames(teamID: number): Observable<Game[]>{
    return this.http.get<Game[]>("https://newyork-backend.azurewebsites.net/api/game/friendly/played/team/" + teamID.toString());
  }

  getGame(id: number): Observable<Game>{
    return this.http.get<Game>("https://newyork-backend.azurewebsites.net/api/game/" + id);
  }

  updateGame(id: number, game: Game){
    return this.http.put<Game>("https://newyork-backend.azurewebsites.net/api/game/" + id, game)
  }

  addGame(game: Game){
    return this.http.post<Game>("https://newyork-backend.azurewebsites.net/api/game" , game);
  }

  deleteGame(id: number){
    return this.http.delete<Game>("https://newyork-backend.azurewebsites.net/api/game/" + id)
  }



  
}
