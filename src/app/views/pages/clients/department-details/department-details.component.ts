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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientsService.getDepartmentById(id)
    .subscribe(result => {
      this.department = result;

      // get departments once the company is fetched
      this.clientsService.getUsersByDepartmentId(result.id)
      .subscribe(result => this.listOfUsers = result)
    })
  }

  // Update
  // ----------------------


  // Delete
  // ----------------------

}
