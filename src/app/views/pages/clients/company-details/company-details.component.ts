import { Component, OnInit, TemplateRef } from '@angular/core';
import { Company, Department } from '../model/company.model';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company: Company;
  listOfDepartments: Department[];
  creationDepartmentForm: FormGroup;
  updateDepartmentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getCompany();
  }
  
  // Create
  // ----------------------

  initCreateForm(){
    this.creationDepartmentForm = this.formBuilder.group({
      companyId: [this.company.id],
      name: ""
    })
  }

  createDepartment(){
    this.clientsService.postCreateDepartment(this.creationDepartmentForm.value)
    .subscribe(result => {
  
      // verify that the post has been successful
      if (result.id != 0){
        this.creationDepartmentForm.reset();
        this.listOfDepartments.push(result);
        this.clientsService.popUpSuccess("The Department has been created")
        
      }
      else{
        this.clientsService.popUpError("Something went wrong, please try again");
      }
    })
  }

  // Read
  // ----------------------

  getCompany(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientsService.getCompanyById(id)
      .subscribe(result =>{
        this.company = result
        this.clientsService.getDepartmentsByCompanyId(result.id)
        .subscribe(result => this.listOfDepartments = result)
      }
    );
  }

  // Update
  // ----------------------

  initUpdateForm(department: Department, index: number){
    this.updateDepartmentForm = this.formBuilder.group({
      index: index,
      id: [department.id],
      name: [department.name],
      companyId: [this.company.id]
    })
  }

  updateDepartment(){
    this.clientsService.putUpdateDepartment(this.updateDepartmentForm.value)
      .subscribe(result => this.listOfDepartments[this.updateDepartmentForm.value.index] = result);
  }
  
  // Delete
  // ----------------------

  deleteDepartment(departmentToDelete: Department){

    if(departmentToDelete.numberOfEmployees > 0){
      this.clientsService.popUpError("Employees are affected to the department.\nYou need to delete them first");
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
        this.listOfDepartments = this.listOfDepartments.filter(company => company != departmentToDelete);
        this.clientsService.lilSuccess(`The Company ${departmentToDelete.name} has been deleted`)})
      }
    })
  }

  // Modal
  // ----------------------

  openXlModal(content: TemplateRef<any>) {
    this.clientsService.openXlModal(content);
  }
  
}