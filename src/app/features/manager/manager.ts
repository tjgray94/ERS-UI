import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee';
import { ReimbursementService } from '../../core/services/reimbursement';

@Component({
  selector: 'app-manager',
  imports: [],
  templateUrl: './manager.html',
  styleUrl: './manager.css',
})
export class Manager {

  fName: string = 'Manager';
  id!: number;
  
  // Stats for dashboard
  totalEmployees: number = 0;
  pendingRequests: number = 0;
  totalReimbursed: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router, 
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private reimbService: ReimbursementService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
    
    this.employeeService.get(this.id).subscribe(data => {
      if (data && data.col1fName) {
        this.fName = data.col1fName;
        this.cdr.detectChanges();
      }
    });
    
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.employeeService.getAll().subscribe({
      next: employees => {
        this.totalEmployees = employees.length;
        this.cdr.detectChanges();
      },
      error: () => {
        // Optionally set an error message property for the UI
      }
    });
    
    // Get pending requests count and total reimbursed amount
    this.reimbService.getAll().subscribe({
      next: reimbursements => {
        this.pendingRequests = reimbursements.filter(reimb => reimb.col4status === 'Pending').length;
        this.totalReimbursed = reimbursements.filter(reimb => reimb.col4status === 'Accepted').reduce((total, reimb) => total + (reimb.col2amount || 0), 0);
        this.cdr.detectChanges();
      },
      error: () => {
        // Optionally set an error message property for the UI
      }
    });
  }

  viewEmployees() {
    this.router.navigate([`manager/${this.id}/employees`]);
  }

  allReimbursements(){
    this.router.navigate([`manager/${this.id}/reimbursements`]);
  }

  newEmployee(){
    this.router.navigate(['employees/add']);
  }

  goBack() {
    window.history.back();
  }
}
