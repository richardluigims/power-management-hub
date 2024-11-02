import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CanActivateChildFn } from '@angular/router';

export const routeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let userId = localStorage.getItem('userId');

  if (userId) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};


export const childRouteGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);

  let userId = localStorage.getItem('userId');

  if (userId) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
