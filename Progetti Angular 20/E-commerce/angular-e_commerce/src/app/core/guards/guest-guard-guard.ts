import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { KeycloakService } from '../services/keycloack.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if(KeycloakService.getKeycloak()){
    return router.createUrlTree(['/']);
  }
  return true;
};
