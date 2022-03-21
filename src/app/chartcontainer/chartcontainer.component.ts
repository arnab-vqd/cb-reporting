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
      label: 'Dine in',
      data: this.chartData.dineIn,
      backgroundColor: '#2d2715',
      stack: 'Stack 0',
    });
    this.data.datasets.push({
      label: 'Delivery',
      data: this.chartData.delivery,
      backgroundColor: '#9bd328',
      stack: 'Stack 0',
    });

    if (this.chartData.dineInCompare) {
      this.data.datasets.push({
        label: 'Dine in (Last Year)',
        data: this.chartData.dineInCompare,
        backgroundColor: '#302712',
        stack: 'Stack 1',
      });
    }
    if (this.chartData.deliveryCompare) {
      this.data.datasets.push({
        label: 'Delivery (Last Year)',
        data: this.chartData.deliveryCompare,
        backgroundColor: '#28d3b9',
        stack: 'Stack 1',
      });
    }
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
