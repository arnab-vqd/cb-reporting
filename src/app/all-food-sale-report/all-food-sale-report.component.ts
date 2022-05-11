import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-all-food-sale-report',
  templateUrl: './all-food-sale-report.component.html',
  styleUrls: ['./all-food-sale-report.component.scss']
})
export class AllFoodSaleReportComponent implements OnInit {

  @Input()
  title="Hello";

  @Input()
  chartData ;

  constructor() { }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions;

  ngOnInit() {
    this.processChart();
  }

  processChart() {
    const data1 = this.convertToIntegerArray(this.chartData.thisYear);
    const data2 = this.convertToIntegerArray(this.chartData.compareYear);
    const chartOptionsContent: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: this.title
      },

      xAxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '10px',
            fontFamily: 'Verdana, sans-serif'
          }
        }, categories: ['Total Sale', 'Food Sale', 'Beverage Sale', 'Hookah Sale', 'Buffet Sale', 'Liquor Sales'],

      },
      yAxis: {
        min: 0,
        tickAmount:5,
        title: {
          text: 'Total',
        },

      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: 'Total : <b>{point.y:.1f}</b>'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          data: data1,
          type: 'column',
          dataLabels: {
            enabled: true,
            allowOverlap: true
          }
        }, {
          data: data2 ,
          type: 'column',
          dataLabels: {
            enabled: true, allowOverlap: true
          }
        }]
    };
    this.chartOptions = chartOptionsContent;

  }

  private convertToIntegerArray(thisYear) {
    const arr = [];
    thisYear.forEach(item => {
      if (!item || isNaN(item)) {
        arr.push(0);
      } else {
        arr.push(parseInt(item));
      }
    });
    return arr;

  }
}

