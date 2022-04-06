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
  updateChart() {
    this.data = {
      labels: ['Total Sale', 'Food Sale', 'Beverage Sale', 'Hookah Sale', 'Buffet Sale', 'Liquor Sales'],
      datasets: []
    };
    this.data.datasets.push({
      label: 'Current Year',
      data: this.chartData.thisYear,
      backgroundColor: '#2d2715',
      stack: 'Stack 0',
    });
    this.data.datasets.push({
      label: 'Last Year',
      data: this.chartData.compareYear,
      backgroundColor: '#9bd328',
      stack: 'Stack 1',
    });

  }

  options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top' // place legend on the right side of chart
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)'
        }
      }
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
