import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }
  
  getPhoto(filename : String) : any {
    return this.http.get<any>("https://newyork-backend.azurewebsites.net/api/upload/" +filename);
  }
}
