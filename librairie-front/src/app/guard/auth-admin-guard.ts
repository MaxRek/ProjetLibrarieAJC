import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';

export const AuthAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);


    if(authService.token){
      if(authService.role=="[ROLE_ADMIN]"){
        return true;
      } else {
        alert("Votre compte n'est pas administrateur, accès refusé");
      }
    }

  // Navigation à utiliser dans les guard
  return router.createUrlTree([ '/home' ]);
};

