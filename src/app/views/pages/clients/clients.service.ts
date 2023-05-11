import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company, FormCompany } from './model/company.model';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  // CRUD Company
  // -----------------

  postCreateCompany(form: FormCompany){
    return this.httpClient.post<Company>("https://localhost:7233/api/company/create", form);
  }

  getAllCompanies(){
    return this.httpClient.get<Company[]>("https://localhost:7233/api/company/get_all");
  }

  deleteCompany(company: Company){
    return this.httpClient.delete(`https://localhost:7233/api/company/delete/${company.id}`);
  }

  // Utilities
  //-----------------
  
  popUpSuccess(message: string){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500})
  }

  popUpError(message: string){
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1500})
  }
}

