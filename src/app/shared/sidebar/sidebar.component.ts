import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  menuItems: any[] = [];

  public imageUrl:string = '';
  public userName: string = '';
  

  constructor(public sidebarService: SidebarService,
              private usuarioService: UsuarioService){
   
    this.imageUrl = usuarioService.usuario?.imageUrl || '';
    this.userName = usuarioService.usuario?.name || '';
    
  
  }

}
