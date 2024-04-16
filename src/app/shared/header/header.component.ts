import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  constructor(public router: Router,
              private usuarioService: UsuarioService
              )
  {}

  logout()
  {
    this.usuarioService.logout();
    //this.router.navigateByUrl("/login");
  }

  
  

}
