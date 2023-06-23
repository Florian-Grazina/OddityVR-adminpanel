import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormLogging, WebToken } from './model/model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiRoute = environment.apiRoute;

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }


  postLogging(form: FormLogging): Observable<WebToken>{
    return this.httpClient.post<WebToken>(this.apiRoute + "token", form);
  }

  invalidCredentials(): void{
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Wrong credentials, please try again',
      showConfirmButton: false,
      timer: 1500})
  }

  onLoggedin() {
    if (localStorage.getItem('isLoggedin') && localStorage.getItem('jwt') != null) {
      this.router.navigate(['/']);
    }
  }

  onLogout() {
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('jwt');

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }
}
