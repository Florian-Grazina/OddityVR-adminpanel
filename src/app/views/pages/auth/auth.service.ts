import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormLogging, WebToken } from './model/model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiRoute = environment.apiRoute;
  // apiRoute = "https://localhost:85/api/"

  constructor(
    private httpClient: HttpClient) { }


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
}
