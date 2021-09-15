import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, PositionType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() data: number | number[];
  @Input() labels: Label[];
  @Input() legend: boolean;
  @Input() legendPosition: any;
  @Input() title: any;
  @Input() colors:  string | string[];
  @Input() height: number = 100;
  @Input() width: number = 100;
  @Input() calcBool: boolean = false;

  pieChartType: ChartType = 'doughnut';
  pieChartOptions: ChartOptions = {
    responsive: true
  };
  pieChartPlugins = [];
  pieChartColors: Color[];
  pieChartLabels: Label[];
  // pieChartData: number | number[];
  pieChartData: number | number[];

  constructor() { }

  ngOnInit(): void {
    this.pieChartOptions = {
      // title: {
      //   text: this.title,
      //   fontSize: 20,
      //   display: true
      // },
      legend: {
        align: 'center',
        position: this.legendPosition as PositionType
      },
    };
    this.pieChartColors = [{
      backgroundColor: this.colors, borderWidth: 1
    }];
    this.pieChartLabels = this.labels;
    if(this.calcBool) {
      let percentage = parseFloat(((this.data[0] / this.data[1]) *100).toFixed(2));
      let remainigPercentage = parseFloat((100 - percentage).toFixed(2));
      this.pieChartData = [
        percentage,
        remainigPercentage
      ];
    } else {
      this.pieChartData = this.data;
    }
  }

}
