import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  ersUrl = 'http://localhost:5002';
  private empSubject: BehaviorSubject<Employee | null>;
  public employee: Observable<Employee | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.empSubject = new BehaviorSubject<Employee | null>(JSON.parse(localStorage.getItem('employee') ?? 'null'));
    this.employee = this.empSubject.asObservable();
  }

  public get empValue(): Employee | null {
    return this.empSubject.value;
  }

  login(col3username: string, col4password: string) {
    return this.http.post<any>(`${this.ersUrl}/login`, { col3username, col4password })
    .pipe(map(employee => {
      // store employee details and credentials in local storage to keep employee logged in between page refreshes
      employee.authdata = window.btoa(col3username + ':' + col4password);
      localStorage.setItem('user', JSON.stringify(employee));
      this.empSubject.next(employee);
      return employee;
    }))
  }

  logout() {
    // removes employee from local storage to log employee out 
    localStorage.removeItem('employee');
    this.empSubject.next(null);
    this.router.navigate(['/login']);
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.ersUrl}/api/employees`)
    .pipe(
      catchError(this.handleError)
    );
  }

  get(id: any): Observable<Employee> {
    return this.http.get(`${this.ersUrl}/api/employees/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.ersUrl}/api/employees`, data);
  }

  verifyPassword(id: number, currentPassword: string): Observable<{ valid: boolean }> {
    return this.http.post<{ valid: boolean }>(`${this.ersUrl}/api/employees/${id}/verify-password`, { currentPassword });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.ersUrl}/api/manager/${id}/job-title`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.ersUrl}/api/employees/${id}`)
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.ersUrl}/api/employees`)
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(() => errorMessage);
  }  
}
