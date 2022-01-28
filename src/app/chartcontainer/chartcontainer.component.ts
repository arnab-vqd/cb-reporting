import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chartcontainer.component.html',
  styleUrls: ['./chartcontainer.component.scss']
})
export class ChartcontainerComponent implements OnInit {
  @Input('chart_label') chartLabel: any = '';
  type = 'bar';
  data = {
    labels: ['Total Sale', 'Food Sale', 'Beverage Sale', 'Hookah Sale', 'Buffet Sale', 'Liquor Sales'],
    datasets: [
      {
        label: 'Dine in',
        data: [10, 45, 52, 74, 20, 25],
        backgroundColor: 'rgb(202 21 63)'
      },
      {
        label: 'Delivery',
        data: [40, 25, 42, 17, 20, 36],
        backgroundColor: 'rgb(6 126 246)'
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top' // place legend on the right side of chart
    },
    scales: {
      xAxes: [{
        stacked: true // this should be set to make the bars stacked
      }],
      yAxes: [{
        stacked: true // this also..
      }]
    }
  };
  constructor() { }

  ngOnInit() {
  }

}
