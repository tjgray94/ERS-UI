import { Routes } from '@angular/router';
import { AddEmployee } from './features/employees/add-employee/add-employee';
import { AddReimbursement } from './features/reimbursements/add-reimbursement/add-reimbursement';
import { EditEmployee } from './features/employees/edit-employee/edit-employee';
import { EmployeeDetails } from './features/employees/employee-details/employee-details';
import { EmployeeList } from './features/employees/employee-list/employee-list';
import { EmployeeHome } from './features/employees/employee-home/employee-home';
import { Manager } from './features/manager/manager';
import { ReimbursementDetails } from './features/reimbursements/reimbursement-details/reimbursement-details';
import { ReimbursementList } from './features/reimbursements/reimbursement-list/reimbursement-list';
import { Welcome } from './features/welcome/welcome';
import { Login } from './features/auth/login/login';


export const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'login', component: Login },
  { path: 'employee/:empId', component: EmployeeHome },
  { path: 'employee/:empId/edit', component: EditEmployee },
  { path: 'employee/:empId/reimbursements', component: ReimbursementList },
  { path: 'employee/:empId/reimbursements/add', component: AddReimbursement },
  { path: 'employees/add', component: AddEmployee },
  { path: 'manager/:empId', component: Manager },
  { path: 'manager/:empId/edit', component: EditEmployee },
  { path: 'manager/:empId/employees', component: EmployeeList },
  { path: 'manager/:empId/employee-details', component: EmployeeDetails },
  { path: 'manager/:empId/reimbursements', component: ReimbursementList },
  { path: 'manager/:empId/reimbursements/:reimbId', component: ReimbursementDetails },
];
