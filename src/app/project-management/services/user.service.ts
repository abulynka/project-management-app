/* eslint-disable @typescript-eslint/comma-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpData } from 'src/app/auth/models/authorization.model';
import { apiRoot } from 'src/environments/environment';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(public http: HttpClient) {}

  public getUsers(): Observable<any> {
    return this.http.get(`${apiRoot}/users`, httpOptions);
  }

  public getUserById(id: string): Observable<any> {
    return this.http.get(`${apiRoot}/users/${id}`, httpOptions);
  }

  public updateUser(id: string, _userData: SignUpData): Observable<any> {
    return this.http.put(`${apiRoot}/users/${id}`, _userData, httpOptions);
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(`${apiRoot}/users/${id}`);
  }
}
