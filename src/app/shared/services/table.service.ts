import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  selectedTable : Table;
  constructor(private http: HttpClient) { }

  getTables(): Observable<Table[]>{
    return this.http.get<Table[]>("https://localhost:44300/api/table");
  }

  getTable(id: number): Observable<Table>{
    return this.http.get<Table>("https://localhost:44300/api/table/" + id);
  }

  updateTable(id: number, table: Table){
    return this.http.put<Table>("https://localhost:44300/api/table/" + id, table)
  }

  addTable(table: Table){
    return this.http.post<Table>("https://localhost:44300/api/table" , table);
  }

  deleteTable(id: number){
    return this.http.delete<Table>("https://localhost:44300/api/table/" + id)
  }
}
