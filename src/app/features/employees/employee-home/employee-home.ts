import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee';
import { Employee } from '../../../core/models/employee';

@Component({
  selector: 'app-employee-home',
  imports: [],
  templateUrl: './employee-home.html',
  styleUrl: './employee-home.css',
})
export class EmployeeHome {
  fName: string = '';
  id!: number;
  currentEmployee!: Employee;
  errorMessage: string | null = null;

  constructor(
    private cdr: ChangeDetectorRef, 
    private router: Router, 
    private route: ActivatedRoute, 
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
    this.employeeService.get(this.id).subscribe({ 
      next: data => {
        this.currentEmployee = data;
        this.fName = this.currentEmployee.col1fName ?? '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load employee details. Please try again later.';
      }
    })
  }
  
  newReimbursement(){
    this.router.navigate([`employee/${this.id}/reimbursements/add`]);
  }

  seeRequests(){
    this.router.navigate([`employee/${this.id}/reimbursements`]);
  }

  updatePassword(){
    this.router.navigate([`employee/${this.id}/edit`])
  }
}
