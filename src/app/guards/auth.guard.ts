import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const registerService = inject(RegisterService);
  const router = inject(Router);

  return registerService.isAuthenticated().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login']);
      }
      return false;
    })
  );
};
