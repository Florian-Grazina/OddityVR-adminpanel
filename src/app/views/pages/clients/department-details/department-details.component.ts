import { Component, OnInit, TemplateRef } from '@angular/core';
import { ClientRoles, Department, FormField, User } from './../model/clients.model';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  department: Department;
  listOfUsers: User[];
  listOfRoles: ClientRoles[];
  userForm: FormGroup;
  isLoading: boolean;
  retryFetch: boolean;
  defaultSelected: number;
  formTitle: String;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getDepartment();
  }

  // Create
  // ----------------------

  initCreateForm(): void{
    this.defaultSelected = 1;
    this.formTitle = "Create new User";

    this.userForm = this.formBuilder.group({
      departmentId: [this.department.id],
      roleId: this.defaultSelected,
      email: "",
      password: "",
      birthdate: "",
    })
  }

  createUser(): void{
    if (this.checkForm(this.userForm)){

      this.clientsService.postCreateUser(this.userForm.value).subscribe({
        next: (result) => {
          this.userForm.reset();
          this.listOfUsers.push(result);
          this.clientsService.popUpSuccess("The User has been created")
          this.department.numberOfEmployees ++;
        },
        error: (err) => {
          this.clientsService.popUpError("Something went wrong, please try again");
        }
      })
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

  initUpdateForm(user: User, index: number): void{
    this.defaultSelected = user.roleId;
    this.formTitle = "Update User";

    const datePipe = new DatePipe('en-US');
    let newDate = datePipe.transform(user.birthdate, 'yyyy-MM-dd');
    
    this.userForm = this.formBuilder.group({
      index: index,
      roleId: "this.defaultSelected",
      departmentId: [this.department.id],
      birthdate: [newDate],
      id: [user.id],
      email: [user.email],
    })
  }

  updateUser(): void{
    if(this.checkForm(this.userForm)){

      console.log(this.userForm.value);
      

      this.clientsService.putUpdateUser(this.userForm.value).subscribe({
        next: (result) => {
          this.isLoading = false;
          this.listOfUsers[this.userForm.value.index] = result;
          this.clientsService.lilSuccess("The user has been updated")
        },
        error: (err) => {
          this.isLoading = false;
          this.retryFetch = true;
          this.clientsService.popUpError("Something went wrong, please try again")
        }
      })
    }
  }

  // Delete
  // ----------------------

  deleteUser(userToDelete: User): void {

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
      this.clientsService.deleteUser(userToDelete)
      
      .subscribe(result => {
        this.listOfUsers = this.listOfUsers.filter(user => user != userToDelete);
        this.department.numberOfEmployees --;
        this.clientsService.lilSuccess(`The User ${userToDelete.email} has been deleted`)})
      }
    })
  }

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

  openModal(content: TemplateRef<any>): void{
    this.clientsService.openModal(content);
  }

  checkForm(form: FormGroup): boolean{
    var options: FormField = {
      "email": 50,
    }
    return this.clientsService.checkForm(form, options)
  }
}
