import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const userService = inject(UsuarioService);
  const router = inject(Router);

  if(userService.role === 'ADMIN_ROLE')
  {
    return true;
  }else{
    router.navigateByUrl('/dashboard');
    return false;
  }

};
