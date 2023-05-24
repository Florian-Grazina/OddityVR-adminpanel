import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClientRoles, Department, FormField, User } from '../model/company.model';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  department: Department;
  listOfUsers: User[];
  listOfRoles: ClientRoles[];
  creationUserForm: FormGroup;
  isLoading: boolean;
  retryFetch: boolean;
  defaultSelected = 1;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getDepartment();
  }

  // Create
  // ----------------------

  initCreateForm(): void{
    this.creationUserForm = this.formBuilder.group({
      departmentId: [this.department.id],
      roleId: [this.department.id],
      email: "",
      password: "",
      birthdate: "",
    })
  }

  createUser(): void{
    if (this.checkForm(this.creationUserForm)){

      console.log(this.creationUserForm.value);
      
      // this.clientsService.postCreateUser(this.creationUserForm.value)
      // .subscribe(result => {
    
      //   // verify that the post has been successful
      //   if (result.id != 0){
      //     this.creationUserForm.reset();
      //     this.listOfUsers.push(result);
      //     this.clientsService.popUpSuccess("The User has been created")
      //   }
      //   else{
      //     this.clientsService.popUpError("Something went wrong, please try again");
      //   }
      // })
    }
  }

  // Read
  // ----------------------

  getDepartment(): void{
    this.retryFetch = false;
    this.isLoading = true;

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.clientsService.getDepartmentById(id).subscribe({
      next: (result) => {
      this.isLoading = false;
      this.department = result;

      // get users once the department is fetched
      this.getUsersByDepartmentId(result);
    },
    error: (err) => {
      this.isLoading = false;
      this.retryFetch = true;
      this.clientsService.popUpError("An error has occured, please try reloading");
    }
    });
  }

  getUsersByDepartmentId(result: Department): void {
    this.clientsService.getUsersByDepartmentId(result.id).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.listOfUsers = result;
        this.getClientRoles();
      },
      error: (err) => {
        this.isLoading = false;
        this.retryFetch = true;
      this.clientsService.popUpError("An error has occured, please try reloading");
      }
    });
  }

  // Update
  // ----------------------


  // Delete
  // ----------------------


  // Roles
  // ----------------------

  getClientRoles(): void {
    this.clientsService.getClientRoles().subscribe({
      next: (result) => {
        console.log(result);
        this.listOfRoles = result}
      });
  }

  // Utilies
  // ----------------------

  openXlModal(content: TemplateRef<any>): void{
    this.clientsService.openXlModal(content);
  }


  checkForm(form: FormGroup): boolean{
    var options: FormField = {
      "email": 50,
      "password": 50
    }
    return this.clientsService.checkForm(form, options)
  }
}
