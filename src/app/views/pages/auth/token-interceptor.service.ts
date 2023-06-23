import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const jwt = localStorage.getItem("jwt");

    if (jwt != null) {

      const modifiedRequest = request.clone({
          headers: request.headers.set("Authorization", "Bearer " + jwt),
        }
      );

      return next.handle(modifiedRequest).pipe(
        catchError((error) => {
          
          if (error.status === 401) {
            this.authService.onLogout();
          }
          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
}