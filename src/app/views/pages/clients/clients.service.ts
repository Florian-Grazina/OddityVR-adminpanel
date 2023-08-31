import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { ClientRoles, Company, Department, FormCreateCompany, FormCreateDepartment, FormCreateUser, FormField, FormUpdateCompany, FormUpdateDepartment, FormUpdateUser, User} from './model/clients.model';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertsService } from '../alerts.service';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  apiRoute = environment.apiRoute;
  
  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal,
    private alertsService: AlertsService) { }


  // CRUD Company
  // -----------------

  postCreateCompany(form: FormCreateCompany): Observable<Company>{
    return this.httpClient.post<Company>(this.apiRoute + "company/create", form);
  }

  getAllCompanies(): Observable<Company[]>{
    return this.httpClient.get<Company[]>(this.apiRoute + "company/get_all");
  }

  getCompanyById(id: number): Observable<Company>{
    return this.httpClient.get<Company>(this.apiRoute + `company/get/${id}`);
  }

  putUpdateCompany(form: FormUpdateCompany): Observable<Company>{
    return this.httpClient.put<Company>(this.apiRoute + "company/update", form);
  }

  deleteCompany(company: Company): Observable<any>{
    return this.httpClient.delete(this.apiRoute + `company/delete/${company.id}`);
  }


  // CRUD Department
  // -----------------

  postCreateDepartment(form: FormCreateDepartment): Observable<Department>{
    return this.httpClient.post<Department>(this.apiRoute + "department/create", form);
  }

  getDepartmentById(id: number): Observable<Department>{
    return this.httpClient.get<Department>(this.apiRoute + `department/get/${id}`);
  }

  getDepartmentsByCompanyId(id: number): Observable<Department[]>{
      return this.httpClient.get<Department[]>(this.apiRoute + `department/get_all_from_company/${id}`)
  }

  putUpdateDepartment(form: FormUpdateDepartment): Observable<Department>{
    return this.httpClient.put<Department>(this.apiRoute + "department/update", form);
  }

  deleteDepartment(department: Department): Observable<any>{
    return this.httpClient.delete(this.apiRoute + `department/delete/${department.id}`);
  }


  // CRUD Users
  // -----------------

  postCreateUser(form: FormCreateUser): Observable<User>{
    console.log(form);
    
    return this.httpClient.post<User>(this.apiRoute + "user/create", form);
  }

  getUsersByDepartmentId(id: number): Observable<User[]>{
      return this.httpClient.get<User[]>(this.apiRoute + `user/get_all_from_department/${id}`)
  }

  putUpdateUser(form: FormUpdateUser): Observable<User>{
    return this.httpClient.put<User>(this.apiRoute + "user/update", form);
  }

  deleteUser(user: User): Observable<any>{
    return this.httpClient.delete(this.apiRoute + `user/delete/${user.id}`);
  }


  // Roles
  // -----------------

  getClientRoles(): Observable<ClientRoles[]>{
    return this.httpClient.get<ClientRoles[]>(this.apiRoute + `role/get_client_roles`)
  }


  // Utilities - Forms
  //-----------------
  
  openModal(content: TemplateRef<any>): void {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  checkForm(form: FormGroup, options: FormField): boolean{

    // check empty fields
    if(Object.values(form.value).some((elem: any) => String(elem) == "")){
      this.alertsService.popUpError("The form is incomplete");
      return false;
    };

    // check fields length
    let errorMessage = "";

    for(var key in options){
      if(form.value[key].length > options[key]){
        errorMessage += `${key} can't exceed ${options[key]} char\n`;
      }
    }

    if (errorMessage == ""){
      return true;
    }
    else {
      this.alertsService.popUpError(errorMessage);
      return false;
    }
  }
}