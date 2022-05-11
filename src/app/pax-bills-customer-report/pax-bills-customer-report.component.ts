import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pax-bills-customer-report',
  templateUrl: './pax-bills-customer-report.component.html',
  styleUrls: ['./pax-bills-customer-report.component.scss']
})
export class PaxBillsCustomerReportComponent implements OnInit {

  @Input()
  title;

  @Input()
  totalPax = [0, 0];

  @Input()
  billCount = [0, 0];

  @Input()
  customers = [0, 0];

  constructor() { }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions;

  ngOnInit() {
    this.processChart();
  }

  processChart() {
    const chartOptionsContent: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Pax/Bills/Customers'
      },

      xAxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '10px',
            fontFamily: 'Verdana, sans-serif'
          }
        }, categories: [
          'PAX',
          'BILLS',
          'AVERAGE PER CUSTOMER',
          'AVERAGE PER BILL'
        ],

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
          data: [this.totalPax[0], this.billCount[0],
            parseInt(String(this.customers[2] / this.customers[0])),
            parseInt(String(this.customers[2] / this.billCount[0]))],
          type: 'column',
          dataLabels: {
            enabled: true,
          }
        }, {
          data: [this.totalPax[1], this.billCount[1],
            parseInt(String(this.customers[3] / this.customers[1])),
            parseInt(String(this.customers[3] / this.billCount[1]))],
          type: 'column',
          dataLabels: {
            enabled: true,
          }
        }]
    };
    this.chartOptions = chartOptionsContent;

  }

}
