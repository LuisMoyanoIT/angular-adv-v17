import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const userService = inject(UsuarioService);
  const router = inject(Router);
  
  return userService.validateUserToken().pipe(
    tap( (isAuthenticated) =>{
      if( !isAuthenticated)
      {
        router.navigateByUrl('/login');
        return false;
      }else{
        return true;
      }
    } )
  )
};



