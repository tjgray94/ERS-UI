import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Auth } from '../services/auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: Auth
  ) { }

  ngOnInit(): void {
    // Subscribe to auth service to get login status updates
    this.authService.isLoggedIn$.subscribe(
      loggedIn => this.isLoggedIn = loggedIn
    );
    
    // Update login status on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkLoginStatus();
    });
    
    // Initial check
    this.checkLoginStatus();
  }
  
  checkLoginStatus(): void {
    // Check if user is logged in by looking for user ID in the URL
    const isInUserRoute = this.router.url.includes('/employee/') || this.router.url.includes('/manager/');
                          
    if (isInUserRoute && !this.isLoggedIn) {
      // Extract user ID and type from URL
      const urlParts = this.router.url.split('/');
      const userType = urlParts[1]; // 'employee' or 'manager'
      const userId = urlParts[2];
      
      if (userId) {
        this.authService.login(parseInt(userId), userType);
      }
    }
  }
  
  logout(): void {
    this.authService.logout();
  }
}
