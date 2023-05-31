import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormLogging, WebToken } from './model/model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient) { }


  postLogging(form: FormLogging): Observable<WebToken>{
    return this.httpClient.post<WebToken>("https://localhost:7233/api/token", form);
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
