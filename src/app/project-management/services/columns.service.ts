/* eslint-disable @typescript-eslint/comma-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewColumn } from '../models/boards.model';
import { apiRoot } from 'src/environments/environment';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  public constructor(public http: HttpClient) {}

  public getAllColumns(boardId: string): Observable<any> {
    return this.http.get(`${apiRoot}/board/${boardId}/columns`, httpOptions);
  }

  public createColumn(boardId: string, columnInfo: NewColumn): Observable<any> {
    return this.http.post(
      `${apiRoot}/board/${boardId}/columns`,
      columnInfo,
      httpOptions
    );
  }

  public getColumnById(boardId: string, columnId: string): Observable<any> {
    return this.http.get(
      `${apiRoot}/board/${boardId}/columns/${columnId}`,
      httpOptions
    );
  }

  public deleteColumn(boardId: string, columnId: string): Observable<any> {
    return this.http.delete(`${apiRoot}/board/${boardId}/columns/${columnId}`);
  }

  public updateColumn(
    boardId: string,
    columnId: string,
    columnInfo: NewColumn
  ): Observable<any> {
    return this.http.put(
      `${apiRoot}/board/${boardId}/columns/${columnId}`,
      columnInfo,
      httpOptions
    );
  }
}
