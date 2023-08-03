import { Component, OnInit } from '@angular/core';
import { TestUser } from '../model/tests.model';
import { TestsService } from '../tests.service';
import { AlertsService } from '../../alerts.service';

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent implements OnInit {

  listOfUsers: TestUser[];

  isLoading: boolean;
  retryFetch: boolean;

  constructor(
    private testService: TestsService,
    private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.getTests();
  }


  getTests(): void{
    this.retryFetch = false;
    this.isLoading = true;

    this.testService.getAllTestUsers().subscribe({
      next: (result) => {
        this.isLoading = false;
        this.listOfUsers = result;
      },
      error: (err) => {
        this.isLoading = false;
        this.retryFetch = true;
        this.alertsService.popUpError("An error has occured, please try reloading")
      }
    })
  }
}
