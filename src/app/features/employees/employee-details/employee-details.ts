import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee';
import { Employee } from '../../../core/models/employee';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails {

  currentEmployee!: Employee;
  id!: number;
  showPassword: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
    this.getEmployee(this.id);
  }

  getEmployee(id: number): void {
    this.employeeService.get(id).subscribe({
      next: data => {
        this.currentEmployee = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load employee details. Please try again later.';
      }
    });
  }

  updateEmployee() {
    this.router.navigate([`manager/${this.id}/edit`]);
  }

  deleteEmployee(): void {
    this.employeeService.delete(this.currentEmployee.empId).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.errorMessage = 'Failed to delete employee. Please try again later.';
      }
    })
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goBack() {
    window.history.back();
  }
}
