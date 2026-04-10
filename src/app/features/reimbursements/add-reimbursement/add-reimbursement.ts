import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReimbursementService } from '../../../core/services/reimbursement';

@Component({
  selector: 'app-add-reimbursement',
  imports: [ReactiveFormsModule],
  templateUrl: './add-reimbursement.html',
  styleUrl: './add-reimbursement.css',
})
export class AddReimbursement {

  id!: number;
  reimbForm!: FormGroup;
  submitted = false;

  constructor(
    private reimbService: ReimbursementService, 
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['empId'];
    
    this.reimbForm = this.fb.group({
      col2amount: [0, [Validators.required, Validators.min(0.01)]],
      col3reason: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.reimbForm.controls; }

  saveReimb(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.reimbForm.invalid) {
      return;
    }

    const data = {
      employee: { empId: this.id },
      col2amount: this.f['col2amount'].value,
      col3reason: this.f['col3reason'].value,
      col4status: 'Pending'
    };
    
    this.reimbService.create(data).subscribe(() => { 
      this.submitted = true;
    });
  }

  newReimb(): void {
    this.submitted = false;
    this.reimbForm.reset({
      col2amount: 0,
      col3reason: ''
    });
  }

  home() {
    this.router.navigate([`employee/${this.id}`]);
  }

  goBack() {
    window.history.back();
  }
}
