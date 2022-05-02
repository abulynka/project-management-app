import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewBoard } from '../models/boards.model';
import { apiRoot } from 'src/environments/environment';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  public constructor(public http: HttpClient) {}

  public getBoards(): Observable<any> {
    return this.http.get(`${apiRoot}/boards`, httpOptions);
  }

  public createBoard(title: string): Observable<any> {
    return this.http.post(`${apiRoot}/boards`, { title }, httpOptions);
  }

  public getBoardById(id: string): Observable<any> {
    return this.http.get(`${apiRoot}/boards/${id}`, httpOptions);
  }

  public deleteBoard(id: string): Observable<any> {
    return this.http.delete(`${apiRoot}/boards/${id}`);
  }

  public updateBoard(id: string, title: NewBoard): Observable<any> {
    return this.http.put(`${apiRoot}/boards/${id}`, title, httpOptions);
  }
}
