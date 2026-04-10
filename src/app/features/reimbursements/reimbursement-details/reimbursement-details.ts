import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReimbursementService } from '../../../core/services/reimbursement';
import { Reimbursement } from '../../../core/models/reimbursement';

@Component({
  selector: 'app-reimbursement-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './reimbursement-details.html',
  styleUrl: './reimbursement-details.css',
})
export class ReimbursementDetails {

  empId!: number;
  reimbId!: number;
  reimbursement!: Reimbursement;
  reimbs!: Reimbursement[];

  constructor(
    private cdr: ChangeDetectorRef,
    private reimbService: ReimbursementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.empId = this.route.snapshot.params['empId'];
    this.reimbId = this.route.snapshot.params['reimbId'];
    this.reimbService.get(this.reimbId).subscribe(data => {
      this.reimbursement = data;
      this.cdr.detectChanges();
    })
  }

  submit() {
    const data = {
      employee: this.reimbursement.employee ? { empId: this.reimbursement.employee.empId } : null,
      col2amount: this.reimbursement.col2amount,
      col3reason: this.reimbursement.col3reason,
      col4status: this.reimbursement.col4status
    };
  
    this.reimbService.update(this.reimbId, data).subscribe(res => {
      this.router.navigate([`manager/${this.empId}/reimbursements`]);
    })
  }

  getEmployeeId(): string {
    if (!this.reimbursement) return 'N/A';
    if (this.reimbursement.employee && this.reimbursement.employee.empId) {
      return this.reimbursement.employee.empId;
    } else {
      return 'N/A';
    }
  }
  
  back() {
    this.router.navigate([`manager/${this.empId}/reimbursements`]);
  }
}
