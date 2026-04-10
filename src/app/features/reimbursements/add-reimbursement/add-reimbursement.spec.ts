import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReimbursement } from './add-reimbursement';

describe('AddReimbursement', () => {
  let component: AddReimbursement;
  let fixture: ComponentFixture<AddReimbursement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReimbursement],
    }).compileComponents();

    fixture = TestBed.createComponent(AddReimbursement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
