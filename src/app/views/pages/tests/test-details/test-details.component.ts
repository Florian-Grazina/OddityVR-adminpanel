import { Component, OnInit } from '@angular/core';
import { TestUser } from '../model/tests.model';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from '../../alerts.service';
import { TestsService } from '../tests.service';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss']
})
export class TestDetailsComponent implements OnInit {
  testUser: TestUser;
  // listOfTests: Test[];

  isLoading: boolean;
  retryFetch: boolean;

  constructor(
    private route: ActivatedRoute,
    private testsService: TestsService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.getTestUser();
  }

  // Read
  // ----------------------
  getTestUser(): void{
    this.retryFetch = false;
    this.isLoading = true;

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.testsService.getTestUser(id).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.testUser = result;
        
        // get departments once the company is fetched
        // this.getDepartmentsByCompanyId(result);
      },
      error: (err) => {
        this.isLoading = false;
        this.retryFetch = true;
        this.alertsService.popUpError("An error has occured, please try reloading")
      }
    });
  }
}
