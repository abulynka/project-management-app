/* eslint-disable @typescript-eslint/comma-dangle */
import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { Observable } from 'rxjs';
const TOKEN_HEADER_KEY: string = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private token: TokenStorageService) {}

  public intercept(
    req: HttpRequest<Record<string, string>>,
    next: HttpHandler
  ): Observable<HttpEvent<Record<string, string>>> {
    let authReq: HttpRequest<Record<string, string>> = req;
    const token: string | null = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`),
      });
    }
    return next.handle(authReq);
  }
}
