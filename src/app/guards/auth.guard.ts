import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const registerService = inject(RegisterService);

  return true;
  // return registerService.isAuthenticated().pipe(
  //   map((isAuthenticated) => {
  //     if (isAuthenticated) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  // );
};
