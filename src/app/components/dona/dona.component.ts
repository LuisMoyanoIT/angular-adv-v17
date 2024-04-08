import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrl: './dona.component.css'
})
export class DonaComponent {

  @Input() title: string = "Sin titulo";

  //we can set the names of the donut chart labels
  public doughnutChartLabels: string[] = [
    'Label 1',
    'Label 2',
    'Label 3',
  ];

  //we can set the labels, the data, and the colors,
  //three labels => data with lenght 3 => 3 colors
  @Input() public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100], 
        backgroundColor: ['#7EC8E3','#0000FF','#FFC0CB']
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';


  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

}
