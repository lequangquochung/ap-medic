import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin-service';

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
    private adminService: AdminService
   ) {

  }

  ngOnInit(): void {
    if (this.adminService.accessToken && this.adminService.accessToken !== 'undefined') {
      this.router.navigate(['/app']);
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

      this.adminService.signIn(payload).subscribe({
        next: (res) => {
          if(res.success)
            this.router.navigate(['/app']);
          },
        error:(e: Error) => {
          this.errors = 'Username or password incorrect. Please try again!';
          console.log(e);
        }
      })
    }
  }
}
