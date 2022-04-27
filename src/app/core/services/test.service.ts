/* eslint-disable @typescript-eslint/indent */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { SignUpData } from 'src/app/auth/models/authorization.model';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  public apiRoot: string = 'http://localhost:4200/api';

  public constructor(public http: HttpClient) {}

  public addUser(): void {
    console.log('here');
    this.http
      .get(`${this.apiRoot}`, { responseType: 'text' })
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
