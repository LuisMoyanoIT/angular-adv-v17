import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//import {ChartsModule} from 'ng2-charts';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { Grafica1Component } from '../grafica1/grafica1.component';
import { ProgressComponent } from '../progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../components/components.module';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,

  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    BaseChartDirective  
    
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class PagesModule { }
