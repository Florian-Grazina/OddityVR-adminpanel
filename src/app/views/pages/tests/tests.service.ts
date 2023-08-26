import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Test, TestUser } from './model/tests.model';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  apiRoute = environment.apiRoute;

  constructor(
    private httpClient: HttpClient) { }


  // List tests
  // -----------------
  
  getAllTestUsers(): Observable<TestUser[]>{
    return this.httpClient.get<TestUser[]>(this.apiRoute + "test_result/get_all_user");
  }

  // Test details
  // -----------------
  getTestUser(id: number): Observable<TestUser>{
    return this.httpClient.get<TestUser>(this.apiRoute + `test_result/get_user/${id}`);
  }

  getTestsByUser(id: number): Observable<Test[]>{
    return this.httpClient.get<Test[]>(this.apiRoute + `test_result/get_user/${id}`);
  }
  
}
