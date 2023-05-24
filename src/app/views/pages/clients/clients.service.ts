import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { ClientRoles, Company, Department, FormCreateCompany, FormCreateDepartment, FormCreateUser, FormField, FormUpdateCompany, FormUpdateDepartment, User} from './model/company.model';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal) { }


  // CRUD Company
  // -----------------

  postCreateCompany(form: FormCreateCompany): Observable<Company>{
    return this.httpClient.post<Company>("https://localhost:7233/api/company/create", form);
  }

  getAllCompanies(): Observable<Company[]>{
    return this.httpClient.get<Company[]>("https://localhost:7233/api/company/get_all");
  }

  getCompanyById(id: number): Observable<Company>{
    return this.httpClient.get<Company>(`https://localhost:7233/api/company/get/${id}`);
  }

  putUpdateCompany(form: FormUpdateCompany): Observable<Company>{
    return this.httpClient.put<Company>("https://localhost:7233/api/company/update", form);
  }

  deleteCompany(company: Company){
    return this.httpClient.delete(`https://localhost:7233/api/company/delete/${company.id}`);
  }


  // CRUD Department
  // -----------------

  postCreateDepartment(form: FormCreateDepartment): Observable<Department>{
    return this.httpClient.post<Department>("https://localhost:7233/api/department/create", form);
  }

  getDepartmentById(id: number): Observable<Department>{
    return this.httpClient.get<Department>(`https://localhost:7233/api/department/get/${id}`);
  }

  getDepartmentsByCompanyId(id: number): Observable<Department[]>{
      return this.httpClient.get<Department[]>(`https://localhost:7233/api/department/get_all_from_company/${id}`)
  }

  putUpdateDepartment(form: FormUpdateDepartment): Observable<Department>{
    return this.httpClient.put<Department>("https://localhost:7233/api/department/update", form);
  }

  deleteDepartment(department: Department){
    return this.httpClient.delete(`https://localhost:7233/api/department/delete/${department.id}`);
  }


  // CRUD Users
  // -----------------

  postCreateUser(form: FormCreateUser): Observable<User>{
    return this.httpClient.post<User>("https://localhost:7233/api/user/create", form);
  }

  getUsersByDepartmentId(id: number): Observable<User[]>{
      return this.httpClient.get<User[]>(`https://localhost:7233/api/user/get_all_from_department/${id}`)
  }

  // putUpdateDepartment(form: FormUpdateDepartment): Observable<Department>{
  //   return this.httpClient.put<Department>("https://localhost:7233/api/department/update", form);
  // }

  // deleteDepartment(department: Department){
  //   return this.httpClient.delete(`https://localhost:7233/api/department/delete/${department.id}`);
  // }


  // Roles
  // -----------------

  getClientRoles(): Observable<ClientRoles[]>{
    return this.httpClient.get<ClientRoles[]>(`https://localhost:7233/api/role/get_client_roles`)
}


  // Utilities - Alerts
  //-----------------
  
  lilSuccess(message: string): void{
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  
    Toast.fire({
      icon: 'success',
      title: message
    })
  }

  popUpSuccess(message: string): void{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500})
  }

  popUpError(message: string): void{
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2500})
  }
  

  // Utilities - Forms
  //-----------------
  
  openXlModal(content: TemplateRef<any>): void {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  checkForm(form: FormGroup, options: FormField): boolean{
    let errorMessage = "";

    // if(Object.values(form.value).some((elem: any) => String(elem) == "")){
    //   this.popUpError("The form is incomplete");
    //   return false;
    // };

    for(var key in options){
      if(form.value[key].length > options[key]){
        errorMessage += `${key} can't exceed ${options[key]} char\n`;
      }
    }

    if (errorMessage == ""){
      return true;
    }
    else {
      this.popUpError(errorMessage);
      return false;
    }
  }
}