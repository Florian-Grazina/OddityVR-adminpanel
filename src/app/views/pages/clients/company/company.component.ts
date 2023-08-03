import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ClientsService } from '../clients.service';
import { Company, FormField } from './../model/clients.model';
import { Observable, of } from 'rxjs';
import { AlertsService } from '../../alerts.service';
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
  listOfCompaniesFilter: Observable<Company[]>;
  currentPage: number = 1;
  searchTerm: string = "";

  isLoading: boolean;
  retryFetch: boolean;

  constructor(
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.creationCompanyForm = this.formBuilder.group({
      name: "",
      number:"",
      street:"",
      city:"",
      postalCode:"",
      country:"",
    });

    this.getAllCompanies();
  }


  // Create
  // ----------------------

  createCompany(): void{
    if (this.checkForm(this.creationCompanyForm)){

      this.clientsService.postCreateCompany(this.creationCompanyForm.value)
      .subscribe(result => {
    
        // verify that the post has been successful
        if (result.id != 0){
          this.creationCompanyForm.reset();
          this.listOfCompanies.push(result);
          this.alertsService.popUpSuccess("The company has been created")
        }
        else{
          this.alertsService.popUpError("Something went wrong, please try again");
        }
      })
    }
  }

  // Read
  // ----------------------

  getAllCompanies(): void{
    this.retryFetch = false;
    this.isLoading = true;

    this.clientsService.getAllCompanies().subscribe({
      next: (result) => {
        this.isLoading = false;
        this.listOfCompanies = result;
        this.loadPage();
      },
      error: (err) => {
        this.isLoading = false;
        this.retryFetch = true;
        this.alertsService.popUpError("An error has occured, please try reloading")
      }
    })
  }
      
      

  // Update
  // ----------------------

  initUpdateForm(company: Company, index: number): void{
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

  updateCompany(): void{
    console.log(this.updateCompanyForm.value);
    
    if(this.checkForm(this.updateCompanyForm)){

      this.clientsService.putUpdateCompany(this.updateCompanyForm.value)
      .subscribe(result => {

        // verify that the update has been successful
        if (result.id != 0){
          this.listOfCompanies[this.updateCompanyForm.value.index] = result;
          this.alertsService.lilSuccess("The company has been updated")
        }
        else {
          this.alertsService.popUpError("Something went wrong, please try again");
        }
      })
    }
  }

  // Delete
  // ----------------------

  deleteCompany(companyToDelete: Company): void{

    if(companyToDelete.numberOfDepartments > 0){
      this.alertsService.popUpError("Departments are affected to the company.\nYou need to delete them first");
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
        
        this.listOfCompanies = this.listOfCompanies.filter(company => company.id != companyToDelete.id);
        this.listOfCompaniesFilter = of(this.listOfCompanies);
        this.alertsService.lilSuccess(`The Company ${companyToDelete.name} has been deleted`)})
      }
    })
  }


  // Utilities
  // ----------------------

  openXlModal(content: TemplateRef<any>): void {
    this.clientsService.openModal(content);
  }

  checkForm(form: FormGroup): boolean{
    var options: FormField = {
      "name" : 50,
      "number" : 10,
      "street" : 100,
      "city" : 50,
      "country" : 50
    }

    return this.clientsService.checkForm(form, options)
  }

  
  // Search
  // ----------------------

  search(term: string): void {
    this.searchTerm = term;

    this.listOfCompaniesFilter = of(this.listOfCompanies
      .filter(comp => comp.name
        .trim()
        .toLowerCase()
        .includes(term.toLowerCase())));
  }
  
  loadPage(): void{
    this.search(this.searchTerm);
  }
}
