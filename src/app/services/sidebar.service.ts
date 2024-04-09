import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] =[
    {
      title: 'Home',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Home', url: '/'},
        {title: 'progressBar', url: 'progress'},
        {title: 'graficas', url: 'grafica1'},
      ]
    }
  ]

  constructor() { }
}
