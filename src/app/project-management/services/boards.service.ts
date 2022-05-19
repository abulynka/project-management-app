import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, concatMap, Observable, toArray } from 'rxjs';
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

  public createBoard(
    title: string,
    description: string,
  ): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(`${apiRoot}/boards`, {
      title,
      description,
    });
  }

  public getFullBoards(): any {
    return this.getBoards().pipe(
      concatMap((boardsShort: BoardResponse[]) => {
        const boardsObservables: Array<Observable<Board>> = boardsShort.map(
          (b: BoardResponse) => this.getBoardById(b.id),
        );
        return concat(...boardsObservables).pipe(toArray());
      }),
    );
  }

  public getBoardById(id: string): Observable<Board> {
    return this.http.get<Board>(`${apiRoot}/boards/${id}`);
  }

  public deleteBoard(id: string): Observable<void> {
    return this.http.delete<void>(`${apiRoot}/boards/${id}`);
  }

  public updateBoard(
    id: string,
    title: string,
    description: string,
  ): Observable<BoardResponse> {
    return this.http.put<BoardResponse>(`${apiRoot}/boards/${id}`, {
      title,
      description,
    });
  }
}
