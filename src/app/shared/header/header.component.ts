import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  public imageUrl:string = '';
  public userName: string = '';
  public userEmail: string = '';

  constructor(public router: Router,
              private usuarioService: UsuarioService
              )
  {
    this.imageUrl = usuarioService.usuario?.imageUrl || '';
    this.userName = usuarioService.usuario?.name || '';
    this.userEmail = usuarioService.usuario?.email || '';
  }

  logout()
  {
    this.usuarioService.logout();
    //this.router.navigateByUrl("/login");
  }

  
  

}
