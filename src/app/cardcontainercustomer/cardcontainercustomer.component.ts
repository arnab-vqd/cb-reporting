import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cardcontainercustomer',
  templateUrl: './cardcontainercustomer.component.html',
  styleUrls: ['./cardcontainercustomer.component.scss']
})
export class CardcontainercustomerComponent implements OnInit {

  constructor() { }

  @Input()
  title;

  @Input()
  totalPax = [0, 0];

  @Input()
  billCount = [0, 0];

  @Input()
  customers = [0, 0];

  type = 'bar';

  data = {
  labels: ['Total Pax', 'Total Bills', 'Average Per Customer'],
  datasets: []
};


  ngOnInit() {

    this.data.datasets.push({
      label: 'Current Year',
      data: [this.totalPax[0], this.billCount[0], parseInt(String(this.customers[2] / this.customers[0]))],
      backgroundColor: '#003f5c',
      stack: 'Stack 0',
    });
    this.data.datasets.push({
      label: 'Last Year',
      data: [this.totalPax[1], this.billCount[1], parseInt(String(this.customers[3] / this.customers[1]))],
      backgroundColor: '#bc5090',
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
      }
    },
    scales: {
      xAxes: [{
        stacked: true // this should be set to make the bars stacked
      }],
      yAxes: [{
        stacked: true, // this also..
        ticks: {
          display: true,
        }
      }]
    },
    animation: {
      duration: 1,
      onComplete() {
        const chartInstance = this.chart,
          ctx = chartInstance.ctx;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.textBaseline = 'bottom';
        // Loop through each data in the datasets
        this.data.datasets.forEach((dataset, i) => {
          const meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            const data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      }
    }
  };


}
