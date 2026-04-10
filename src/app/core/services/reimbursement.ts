import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Reimbursement } from '../models/reimbursement';

@Injectable({
  providedIn: 'root',
})
export class ReimbursementService {

  reimbUrl = 'http://localhost:5002/api/reimbursements';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Reimbursement[]> {
    return this.http.get<Reimbursement[]>(this.reimbUrl).pipe(
      catchError(this.handleError)
    );
  }

  getByEmpId(id: any): Observable<Reimbursement[]> {
    return this.http.get<Reimbursement[]>(`${this.reimbUrl}/employee/${id}`);
  }

  get(id: any): Observable<Reimbursement> {
    return this.http.get(`${this.reimbUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.reimbUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.reimbUrl}/${id}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.reimbUrl}/${id}`)
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.reimbUrl)
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if (err.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
