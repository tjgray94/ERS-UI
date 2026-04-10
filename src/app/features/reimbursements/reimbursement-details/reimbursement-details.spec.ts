import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementDetails } from './reimbursement-details';

describe('ReimbursementDetails', () => {
  let component: ReimbursementDetails;
  let fixture: ComponentFixture<ReimbursementDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReimbursementDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ReimbursementDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
