import { Component, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;
  loginError!: String;

  constructor(
    private cdr: ChangeDetectorRef,
    private empService: EmployeeService, 
    private router: Router, 
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.empService.login(username, password).subscribe({
        next: (data) => {
          if (data.jwt && data.empId) {
            const empId = data.empId;
            const title = data.col5title;

            if (title === 'EMPLOYEE') {
              this.router.navigate([`/employee/${empId}`]);
            } else if (title === 'MANAGER') {
              this.router.navigate([`/manager/${empId}`]);
            }
          }
        },
        error: () => {
          this.loginError = 'An error occurred. Please try again.';
          this.cdr.detectChanges();
        }
      });
    }
  }
}
