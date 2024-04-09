import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit{

  linkTheme = document.querySelector('#theme');
  
  constructor(
    private settingsService: SettingsService
  ){}

  ngOnInit(): void {
  }

  

  changeTheme(theme: string)
  {
    console.log("llame")
    this.settingsService.changeTheme(theme);
  }

 

}
