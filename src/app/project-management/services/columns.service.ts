/* eslint-disable @typescript-eslint/comma-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColumnResponse, NewColumn } from '../models/boards.model';
import { apiRoot } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  public constructor(public http: HttpClient) {}

  public getAllColumns(boardId: string): Observable<ColumnResponse> {
    return this.http.get<ColumnResponse>(
      `${apiRoot}/boards/${boardId}/columns`
    );
  }

  public createColumn(
    boardId: string,
    columnInfo: NewColumn
  ): Observable<ColumnResponse> {
    return this.http.post<ColumnResponse>(
      `${apiRoot}/boards/${boardId}/columns`,
      columnInfo
    );
  }

  public getColumnById(
    boardId: string,
    columnId: string
  ): Observable<ColumnResponse> {
    return this.http.get<ColumnResponse>(
      `${apiRoot}/boards/${boardId}/columns/${columnId}`
    );
  }

  public deleteColumn(
    boardId: string,
    columnId: string
  ): Observable<ColumnResponse> {
    return this.http.delete<ColumnResponse>(
      `${apiRoot}/boards/${boardId}/columns/${columnId}`
    );
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    columnInfo: NewColumn
  ): Observable<ColumnResponse> {
    return this.http.put<ColumnResponse>(
      `${apiRoot}/boards/${boardId}/columns/${columnId}`,
      columnInfo
    );
  }
}
