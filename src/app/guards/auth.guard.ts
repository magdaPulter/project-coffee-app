import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  // const router = inject(Router);
  // const registerService = inject(RegisterService);
  // const emailStored = localStorage.getItem('email');
  // const passwordStored = localStorage.getItem('password');

  return true;
};
