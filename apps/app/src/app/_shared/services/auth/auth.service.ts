import { Injectable } from '@angular/core';
import { fromEvent, interval, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'apps/app/src/environments/environment';

const ORIGIN = environment.origin;

enum Type {
  CALLBACK = 'auth-callback',
  AUTH = 'auth-request',
  CLOSE = 'close-window', 
}

interface Message {
  type: string;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken$ = new ReplaySubject<string>(1);

  initialize(): void {
    const popup = this.openAuthorizePopup();
    const request = interval(500).subscribe(() => this.requestAuth(popup));
    const response = fromEvent<Event & {origin: string, data: Message}>(window, 'message').pipe(
      filter(event => event.origin === ORIGIN),
      map(event => event.data),
      filter(m => m.type === Type.CALLBACK),
    ).subscribe((message) => {
      this.accessToken$.next(message.payload.accessToken);
      this.requestClose(popup);
      request.unsubscribe();
      response.unsubscribe();
    });
  }

  private openAuthorizePopup(): Window {
    return window.open(`${ORIGIN}/api/oauth`)!;
  }

  private requestAuth(popup: Window): void {
    popup.postMessage({ type: Type.AUTH, payload: null }, ORIGIN);
  }

  private requestClose(popup: Window): void {
    popup.postMessage({type: Type.CLOSE, payload: null }, ORIGIN);
  }
}
