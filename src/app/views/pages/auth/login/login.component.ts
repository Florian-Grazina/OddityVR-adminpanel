import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean;
  returnUrl: any;
  loggingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loggingForm = this.formBuilder.group({
      email: "",
      password:""
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  tryLogging(): void{
    this.isLoading = true;
    this.authService.postLogging(this.loggingForm.value).subscribe({
      next: (result) => {
        this.isLoading = false;
        localStorage.setItem('jwt', result.key)

        this.authService.onLoggedin();  
      },
      error: (err) => {
        this.isLoading = false;
        this.authService.invalidCredentials();
      }
    })
  }
}
