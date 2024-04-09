import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {


    let URL: any = localStorage.getItem('theme');
    this.linkTheme?.setAttribute('href', (URL ? URL : './assets/css/colors/green.css'));
    this.checkCurrentTheme();
   }


   changeTheme(theme: string)
  {
    const URL = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', URL);
    localStorage.setItem('theme', URL);
    this.checkCurrentTheme();
  }

  checkCurrentTheme()
  {
    const links = document.querySelectorAll('.selector');
    
    links.forEach( element =>{
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if(btnThemeUrl === currentTheme)
      {
        element.classList.add('working');
      }

    })

  }





}
