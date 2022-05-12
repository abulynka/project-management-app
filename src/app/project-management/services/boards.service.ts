import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board, BoardResponse } from '../models/boards.model';
import { apiRoot } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  public constructor(public http: HttpClient) {}

  public getBoards(): Observable<BoardResponse[]> {
    return this.http.get<BoardResponse[]>(`${apiRoot}/boards`);
  }

  public createBoard(title: string): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(`${apiRoot}/boards`, { title });
  }

  public getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(`${apiRoot}/boards/${id}`);
  }

  public deleteBoard(id: string): Observable<void> {
    return this.http.delete<void>(`${apiRoot}/boards/${id}`);
  }

  public updateBoard(id: string, title: string): Observable<BoardResponse> {
    return this.http.put<BoardResponse>(`${apiRoot}/boards/${id}`, { title });
  }
}
