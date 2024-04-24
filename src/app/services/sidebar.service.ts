import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService{

  menuOld: any[] =[
    {
      title: 'Home',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Home', url: '/'},
        {title: 'ProgressBar', url: 'progress'},
        {title: 'Graficas', url: 'grafica1'},
        {title: 'Promesas', url: 'promesas'},
        {title: 'Rx JOTA ESE', url: 'rxjs'},
        {title: 'Perfil', url: 'perfil'},
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {title: 'Usuarios', url: 'usuarios'},
        {title: 'Hospitales', url: 'hospitales'},
        {title: 'Medicos', url: 'medicos'},]

    }
  ]

  public menu:any[] = [];

  constructor() { }
 

  cargarMenu()
  {
    if(localStorage.getItem('menu'))
    {
      this.menu = JSON.parse(localStorage.getItem('menu') || '[]');
      console.log(this.menu);
    }
  }
}
