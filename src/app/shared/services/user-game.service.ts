import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGame } from '../models/user-game.model';

@Injectable({
  providedIn: 'root'
})
export class UserGameService {

  constructor(private http: HttpClient) { }

  getUserGames(): Observable<UserGame[]>{
    return this.http.get<UserGame[]>("https://localhost:44300/api/userGame");
  }

  getUserGame(id: number): Observable<UserGame>{
    return this.http.get<UserGame>("https://localhost:44300/api/userGame/" + id);
  }

  getUserGameByGame(id: number): Observable<UserGame[]>{
    return this.http.get<UserGame[]>("https://localhost:44300/api/userGame/game/" + id);
  }

  updateUserGame(id: number, userGame: UserGame){
    return this.http.put<UserGame>("https://localhost:44300/api/userGame/" + id, userGame)
  }

  addUserGame(userGame: UserGame){
    return this.http.post<UserGame>("https://localhost:44300/api/userGame" , userGame);
  }

  deleteUserGame(id: number){
    return this.http.delete<UserGame>("https://localhost:44300/api/userGame/" + id)
  }
  
  deleteUserGameByGameAndUser(gameID: number, userID: number){
    console.log("Inside service, gameID:", gameID, "userID:", userID);
    return this.http.delete<UserGame>("https://localhost:44300/deletegameanduser/" + gameID + "/" + userID)
  }
  
}
