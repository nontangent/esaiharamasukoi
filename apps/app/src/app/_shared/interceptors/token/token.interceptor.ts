import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isApiRequest(request)) return next.handle(request);

    return this.auth.accessToken$.pipe(
      map(token => request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)})),
      switchMap(request => next.handle(request)),
    );
  }

  private isApiRequest(request: HttpRequest<unknown>): boolean {
    return request.url.startsWith(`/api`);
  }
}
