import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReimbursementService } from '../../../core/services/reimbursement';
import { Reimbursement } from '../../../core/models/reimbursement';

@Component({
  selector: 'app-reimbursement-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './reimbursement-list.html',
  styleUrl: './reimbursement-list.css',
})
export class ReimbursementList {

  empId!: number;
  reimbId!: number;
  reimbs!: Reimbursement[];
  currentReimb?: Reimbursement;
  currentRoute: string = '';
  currentIndex = -1;
  jobTitle: string = '';
  @ViewChild('reimbursementForm') form!: NgForm;

  constructor(
    private cdr: ChangeDetectorRef,
    private reimbService: ReimbursementService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.empId = this.route.snapshot.params['empId'];
    this.reimbId = this.route.snapshot.params['reimbId'];

    this.currentRoute = this.route.snapshot.url.join('/');
    
    if (this.currentRoute.includes('manager')) {
      this.jobTitle = 'manager';
      this.reimbService.getAll().subscribe((data) => { 
        this.reimbs = data;
        this.cdr.detectChanges();
      });
    } else if (this.currentRoute.includes('employee')) {
      this.jobTitle = 'employee';
      this.reimbService.getByEmpId(this.empId).subscribe((data) => { 
        this.reimbs = data;
        this.cdr.detectChanges();
      });
    }   
  }

  setActiveReimb(reimb: Reimbursement, index: number): void {
    this.currentReimb = reimb;
    this.currentIndex = index;
  }

  selectReimb() {
    this.router.navigate([`employee/${this.empId}/reimbursements/${this.reimbId}`]);
  }

  goBack() {
    if (this.currentRoute.includes('manager')) {
      this.router.navigate([`manager/${this.empId}`]);
    } else {
      this.router.navigate([`employee/${this.empId}`]);
    }
  }
}
