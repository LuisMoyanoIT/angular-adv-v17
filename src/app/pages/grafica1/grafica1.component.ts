import { Component } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})
export class Grafica1Component {
 
  public doughnutChartLabels1: string[] = [
    'Completos',
    'Pizza',
    'Sushi',
  ];


  public doughnutChartData1: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels1,
    datasets: [
      { data: [35000, 4510, 10900], 
        backgroundColor: ['#7EC8E3','#0000FF','#FFC0CB']
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';



}
