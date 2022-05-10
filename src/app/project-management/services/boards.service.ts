import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Board, BoardResponse } from '../models/boards.model';
import { apiRoot } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  public boardProcessedSource: Subject<void> = new Subject<void>();

  public boardProcessed$: Observable<void> =
    this.boardProcessedSource.asObservable();

  public constructor(public http: HttpClient) {}

  public getBoards(): Observable<BoardResponse[]> {
    return this.http.get<BoardResponse[]>(`${apiRoot}/boards`);
  }

  public createBoard(title: string): Observable<BoardResponse> {
    // todo: remove this pipe after ngrx will be implemented
    return this.http.post<BoardResponse>(`${apiRoot}/boards`, { title }).pipe(
      map((data: BoardResponse): BoardResponse => {
        this.boardProcessedSource.next();
        return data;
      }),
    );
  }

  public getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(`${apiRoot}/boards/${id}`);
  }

  public deleteBoard(id: string): Observable<BoardResponse> {
    // todo: remove this pipe after ngrx will be implemented
    return this.http.delete<BoardResponse>(`${apiRoot}/boards/${id}`).pipe(
      map((data: BoardResponse): BoardResponse => {
        this.boardProcessedSource.next();
        return data;
      }),
    );
  }

  public updateBoard(id: string, title: string): Observable<BoardResponse> {
    // todo: remove this pipe after ngrx will be implemented
    return this.http
      .put<BoardResponse>(`${apiRoot}/boards/${id}`, { title })
      .pipe(
        map((data: BoardResponse): BoardResponse => {
          this.boardProcessedSource.next();
          return data;
        }),
      );
  }
}
