import { Component, OnInit } from '@angular/core';
import { User } from '../model/tests.model';

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent implements OnInit {

  listOfUsers: User[];

  isLoading: boolean;
  retryFetch: boolean;

  constructor() { }

  ngOnInit(): void {
  }


  getTests(): void{
    return;
  }
}
