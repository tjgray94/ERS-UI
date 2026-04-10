import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee';
import { Employee } from '../../../core/models/employee';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  
  employees!: Employee[];
  errorMessage: string | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next: data => {
        this.employees = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load employee details. Please try again later.';
      }
    });
  }

  gotoDetails(employee: Employee): void {
    this.router.navigate([`/manager/${employee.empId}/employee-details`])
  }

  delete(id: number | undefined) {
    this.employeeService.delete(id).subscribe(
      () => {
        this.employees = this.employees.filter(employee => employee.empId !==id);
        this.cdr.detectChanges();
      }
    )
  }

  removeAllEmployees(): void {
    this.employeeService.deleteAll().subscribe({
      next: () => {
        this.employees = [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to remove all employees. Please try again later.';
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
