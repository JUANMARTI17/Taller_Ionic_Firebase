import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authguard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuth = await authService.isAuth();
  if(!isAuth) {
    router.navigateByUrl("")
    return false;
  }
  return true;
};
