import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MasterService } from '../services/master.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(MasterService);
  if (service.isLoggedIn()) {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
