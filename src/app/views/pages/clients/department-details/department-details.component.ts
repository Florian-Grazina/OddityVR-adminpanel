import { Component, OnInit } from '@angular/core';
import { Department, User } from '../model/company.model';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  department: Department;
  listOfUsers: User[];
  isLoading: boolean;
  retryFetch: boolean;

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
    this.getDepartment();
  }

  // Create
  // ----------------------


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

      // get departments once the company is fetched
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

}
