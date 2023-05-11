import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ClientsService } from '../clients.service';
import { Company } from '../model/company.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  creationFormCompany: FormGroup;
  listOfCompanies: Company[];

  constructor(
    private clientsService: ClientsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.creationFormCompany = this.formBuilder.group({
      name:"",
      number:"",
      street:"",
      city:"",
      postalCode:"",
      country:""
    })

    this.clientsService.getAllCompanies().subscribe(result => {
      this.listOfCompanies = result;
    })
  }


  // Create
  // ----------------------

  checkForm() {
    // verify all fields
    if(Object.values(this.creationFormCompany.value).some((elem: any) => elem == "")){
      return this.clientsService.popUpError("The form is incomplete");
    };
    if (this.creationFormCompany.value["name"].length > 50){
      return this.clientsService.popUpError("The name can't exceed 50 characters");
    };
    if (this.creationFormCompany.value["number"].length > 10){
      return this.clientsService.popUpError("The number can't exceed 10 characters");
    };
    if (this.creationFormCompany.value["street"].length > 100){
      return this.clientsService.popUpError("The street can't exceed 100 characters");
    };
    if (this.creationFormCompany.value["city"].length > 50){
      return this.clientsService.popUpError("The city can't exceed 50 characters");
    };
    if (this.creationFormCompany.value["postalCode"].length > 10){
      return this.clientsService.popUpError("The postal code can't exceed 10 characters");
    };
    if (this.creationFormCompany.value["country"].length > 50){
      return this.clientsService.popUpError("The country can't exceed 50 characters");
    };
    this.createCompany();
  }

  createCompany(){
    this.clientsService.postCreateCompany(this.creationFormCompany.value)
    .subscribe(result => {
  
      // verify that the post has been successful
      if (result.id != 0){
        this.creationFormCompany.reset();
        this.clientsService.popUpSuccess("The Company has been created");
        this.listOfCompanies.push(result);
      }
      else{
        this.clientsService.popUpError("Something went wrong, please try again");
      }
    })
  }

  
  // Read
  // ----------------------

  


  deleteCompany(companyToDelete: Company){

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
        this.clientsService.popUpSuccess(`Company id ${companyToDelete.id} has been deleted`)})
      }
    })
  }
}
