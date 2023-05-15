import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientsService } from '../clients.service';
import { Company } from '../model/company.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  creationCompanyForm: FormGroup;
  updateCompanyForm: FormGroup;
  listOfCompanies: Company[];

  constructor(
    private clientsService: ClientsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.creationCompanyForm = this.formBuilder.group({
      name: "",
      number:"",
      street:"",
      city:"",
      postalCode:"",
      country:""
    })

    this.clientsService.getAllCompanies()
      .subscribe(result => this.listOfCompanies = result)
  }


  // Create
  // ----------------------

  checkForm(form: FormGroup) {
    // verify all fields
    if(Object.values(form.value).some((elem: any) => elem == "")){
      return this.clientsService.popUpError("The form is incomplete");
    };
    if (form.value["name"].length > 50){
      return this.clientsService.popUpError("The name can't exceed 50 characters");
    };
    if (form.value["number"].length > 10){
      return this.clientsService.popUpError("The number can't exceed 10 characters");
    };
    if (form.value["street"].length > 100){
      return this.clientsService.popUpError("The street can't exceed 100 characters");
    };
    if (form.value["city"].length > 50){
      return this.clientsService.popUpError("The city can't exceed 50 characters");
    };
    if (form.value["postalCode"].length > 10){
      return this.clientsService.popUpError("The postal code can't exceed 10 characters");
    };
    if (form.value["country"].length > 50){
      return this.clientsService.popUpError("The country can't exceed 50 characters");
    };
    return true;
  }

  createCompany(){
    if (this.checkForm(this.creationCompanyForm)){

      this.clientsService.postCreateCompany(this.creationCompanyForm.value)
      .subscribe(result => {
    
        // verify that the post has been successful
        if (result.id != 0){
          this.creationCompanyForm.reset();
          this.listOfCompanies.push(result);
          this.clientsService.popUpSuccess("The company has been created")
          
          // creation of a dummy department
          // this.clientsService.crea
        }
        else{
          this.clientsService.popUpError("Something went wrong, please try again");
        }
      })
    }
  }

  // Read
  // ----------------------

  // Update
  // ----------------------

  openXlModal(content: TemplateRef<any>) {
    this.clientsService.openXlModal(content);
  }
  

  initUpdateForm(company: Company, index: number){
    this.updateCompanyForm = this.formBuilder.group({
      index: index,
      id: [company.id],
      name: [company.name],
      number: [company.number],
      street: [company.street],
      city: [company.city],
      postalCode: [company.postalCode],
      country: [company.country]
    })
  }

  updateCompany(){
    if(this.checkForm(this.updateCompanyForm)){

      this.clientsService.putUpdateCompany(this.updateCompanyForm.value)
        .subscribe(result => this.listOfCompanies[this.updateCompanyForm.value.index] = result)
    }
  }



  // Delete
  // ----------------------

  deleteCompany(companyToDelete: Company){

    if(companyToDelete.numberOfDepartments > 0){
      this.clientsService.popUpError("Departments are affected to the company.\nYou need to delete them first");
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
      this.clientsService.deleteCompany(companyToDelete)
      
      .subscribe(result => {
        this.listOfCompanies = this.listOfCompanies.filter(company => company != companyToDelete);
        this.clientsService.lilSuccess(`The Company ${companyToDelete.name} has been deleted`)})
      }
    })
  }
}
