import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chartcontainer.component.html',
  styleUrls: ['./chartcontainer.component.scss']
})
export class ChartcontainerComponent implements OnInit, OnChanges {

  @Input()
  chartLabel: any = '';

  type = 'bar';

  @Input()
  chartData ;

  data;
  updateChart(){
    this.data = {
      labels: ['Total Sale', 'Food Sale', 'Beverage Sale', 'Hookah Sale', 'Buffet Sale', 'Liquor Sales'],
      datasets: [
        {
          label: 'Dine in',
          data: this.chartData.dineIn,
          backgroundColor: 'rgb(202 21 63)'
        },
        {
          label: 'Delivery',
          data: this.chartData.delivery,
          backgroundColor: 'rgb(6 126 246)'
        }
      ]
    };
  }

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
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.chartData = changes.chartData.currentValue;
    this.updateChart();
  }


}
