import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin/admin-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {
  signInForm = this.fb.group({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  });
  errors: string;

  constructor(private router: Router,
    private fb: FormBuilder,
    private adminServiceService: AdminServiceService
   ) {

  }

  ngOnInit(): void {
    if (this.adminServiceService.accessToken && this.adminServiceService.accessToken !== 'undefined') {
      this.router.navigate(['/']);
    }
  }

  protected login() {
    this
    this.errors = '';
    if (this.signInForm.valid) {
      const {email, password} = this.signInForm.value;
      const payload = {
        email: email || '',
        password: password || '',
      }

      this.adminServiceService.signIn(payload).subscribe({
        next: (res) => {
          if(res.success)
            console.log(res);
            this.router.navigate(['/']);
          },
        error:(e: Error) => {
          this.errors = 'Username or password incorrect. Please try again!';
          console.log(e);
        }
      })
    }
  }
}
