import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public rememberMyDetails = false;
  public loginForm;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar) {

    const savedUserCrendentials: any = JSON.parse(localStorage.getItem('userCredentials'));
    this.loginForm = this.fb.group({
      userName: [savedUserCrendentials && savedUserCrendentials.userName ? savedUserCrendentials.userName : '' ],
      password: [savedUserCrendentials && savedUserCrendentials.password ? savedUserCrendentials.password : '']
    });
  }

  rememberMe(event) {
    if (event.checked) {
     this.rememberMyDetails = true;
    }
  }
  
  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      if (this.rememberMyDetails) {
        localStorage.setItem('userCredentials', JSON.stringify(this.loginForm.value));
      }
      this.snackBar.open('Login Success!', '', {
        duration: 2000,
      });
      this.router.navigate(['/orderList']);

    }, ((error: any)   => {
      this.snackBar.open('Failure!', 'Please insert correct credentials', {
        verticalPosition: "top",
        duration: 2000,
      });

    })
    ); // end of login api call
  }
}
