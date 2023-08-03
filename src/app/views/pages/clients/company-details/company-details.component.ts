import { Component, OnInit, TemplateRef } from '@angular/core';
import { Company, Department, FormField } from './../model/clients.model';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Observable, map } from 'rxjs';
import { AlertsService } from '../../alerts.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company: Company;

  listOfDepartments: Department[];
  departmentForm: FormGroup;
  isLoading: boolean;
  retryFetch: boolean;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.getCompany();
  }
  
  // Create
  // ----------------------

  initCreateForm(): void{
    this.departmentForm = this.formBuilder.group({
      companyId: [this.company.id],
      name: ""
    })
  }

  createDepartment(): void{
    if (this.checkForm(this.departmentForm)){

      this.clientsService.postCreateDepartment(this.departmentForm.value)
      .subscribe(result => {
    
        // verify that the post has been successful
        if (result.id != 0){
          this.departmentForm.reset();
          this.listOfDepartments.push(result);
          this.alertsService.popUpSuccess("The Department has been created");
          this.company.numberOfDepartments ++;
        }
        else{
          this.alertsService.popUpError("Something went wrong, please try again");
        }
      })
    }
  }

  // Read
  // ----------------------

  getCompany(): void {
    this.retryFetch = false;
    this.isLoading = true;

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.clientsService.getCompanyById(id).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.company = result;
        
        // get departments once the company is fetched
        this.getDepartmentsByCompanyId(result);
      },
      error: (err) => {
        this.isLoading = false;
        this.retryFetch = true;
        this.alertsService.popUpError("An error has occured, please try reloading")
      }
    });
  }

  getDepartmentsByCompanyId(result: Company): void{
    this.clientsService.getDepartmentsByCompanyId(result.id).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.listOfDepartments = result
      },
      error: (err) => {
        this.isLoading = false;
        this.retryFetch = true;
        this.alertsService.popUpError("An error has occured, please try reloading")
      }
    });
  }

  // Update
  // ----------------------

  initUpdateForm(department: Department, index: number): void{
    this.departmentForm = this.formBuilder.group({
      index: index,
      id: [department.id],
      name: [department.name],
      companyId: [this.company.id]
    })
  }

  updateDepartment(): void{
    if(this.checkForm(this.departmentForm)){

      this.clientsService.putUpdateDepartment(this.departmentForm.value)
      .subscribe(result => {

        // verify the update has been successful
        if(result.id != 0){
          this.listOfDepartments[this.departmentForm.value.index] = result;
          this.alertsService.lilSuccess("The department has been updated")
        }
        else {
          this.alertsService.popUpError("Something went wrong, please try again")
        }
      })
    }
  }
  
  // Delete
  // ----------------------

  deleteDepartment(departmentToDelete: Department): void{

    if(departmentToDelete.numberOfEmployees > 0){
      this.alertsService.popUpError("Employees are affected to the department.\nYou need to delete them first");
      return
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })
    
    .then((result) => {
      if (result.isConfirmed) {
      this.clientsService.deleteDepartment(departmentToDelete)
      
      .subscribe(result => {
        this.listOfDepartments = this.listOfDepartments.filter(department => department != departmentToDelete);
        this.company.numberOfDepartments --;
        this.alertsService.lilSuccess(`The Company ${departmentToDelete.name} has been deleted`)})
      }
    })
  }

  // Utilies
  // ----------------------

  openXlModal(content: TemplateRef<any>): void{
    this.clientsService.openModal(content);
  }


  checkForm(form: FormGroup): boolean{
    var options: FormField = {
      "name" : 50
    }
    return this.clientsService.checkForm(form, options)
  }
}