/* eslint-disable @typescript-eslint/comma-dangle */
import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
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
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any> = req;
    const token: string | null = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`),
      });
    }
    return next.handle(authReq);
  }
}
export const authInterceptorProviders: Array<{
  provide: InjectionToken<HttpInterceptor[]>;
  useClass: typeof AuthInterceptor;
  multi: boolean;
}> = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
