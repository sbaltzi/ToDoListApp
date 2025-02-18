import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('currentUser');

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
