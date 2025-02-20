import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('currentUser');

  if (user) {
    //router.navigate(['/to-do-list']);
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
