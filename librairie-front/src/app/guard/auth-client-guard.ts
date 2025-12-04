import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from "../service/auth-service";

export const AuthClientGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if(authService.token){
      if(authService.role=="[ROLE_CLIENT]"){
        return true;
      } else {
        alert("Votre compte n'est pas client, accès refusé");
      }
    }

  // Navigation à utiliser dans les guard
  return router.createUrlTree([ '/home' ]);
}
