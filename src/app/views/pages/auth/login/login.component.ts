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
  tokenKey: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loggingForm = this.formBuilder.group({
      email: "",
      password:""
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin() {
    if (localStorage.getItem('isLoggedin') && localStorage.getItem('jwt') != null) {
      // this.router.navigate([this.returnUrl]);
      this.router.navigate(['/']);
    }
  }

  tryLogging(): void{
    this.isLoading = true;
    this.authService.postLogging(this.loggingForm.value).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.tokenKey = result.key;
        localStorage.setItem('jwt', this.tokenKey)
        localStorage.setItem('isLoggedin', 'true');

        this.onLoggedin();
      },
      error: (err) => {
        this.isLoading = false;
        this.authService.invalidCredentials();
      }
    })
  }
}
