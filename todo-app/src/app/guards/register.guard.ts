import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const RegisterGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('currentUser');

  if (user) {
    router.navigate(['/to-do-list']); // Redirect logged-in users to the dashboard
    return false; // Block access to register
  }
  return true; // Allow access if not logged in
};
