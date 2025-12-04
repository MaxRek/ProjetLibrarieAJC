import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';

export const AuthClientGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(authService.token){
    if(authService.role=="[ROLE_CLIENT]"){
      return true;
    } else {
      if(!authService.role){
        alert("Vous n'êtes pas connecté à un compte client")
        return router.createUrlTree([ '/connexion' ]);

      } else {
        alert("Votre compte n'est pas client, accès refusé");

        return router.createUrlTree([ '/home' ]);
        
      }
    }
  }
  return router.createUrlTree([ '/home' ]);
}

  // Navigation à utiliser dans les guard
  
