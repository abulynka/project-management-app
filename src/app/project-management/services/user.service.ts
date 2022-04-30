/* eslint-disable @typescript-eslint/comma-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public apiRoot: string = 'http://localhost:4200/api';

  public constructor(public http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.http.get(`${this.apiRoot}/users`, httpOptions);
  }
}
