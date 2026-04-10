import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  // Observable for components to subscribe to
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) {
    // Check if user is logged in on service initialization
    this.checkLoginStatus();
  }

  login(userId: number, userType: string): void {
    // Store login info
    localStorage.setItem('currentUser', JSON.stringify({ id: userId, type: userType }));
    this.loggedIn.next(true);
  }

  logout(): void {
    // Clear stored user data
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  checkLoginStatus(): void {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('currentUser');
    this.loggedIn.next(!!userData);
  }

  getCurrentUser(): any {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }
}
