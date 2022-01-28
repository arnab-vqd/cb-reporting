import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
// import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
// import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  outletList: any = [
    {
      id: 1,
      name: 'outlet 1'
    },
    {
      id: 2,
      name: 'outlet 2'
    },
    {
      id: 3,
      name: 'outlet 3'
    }
  ];
  chartFilterForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.chartFilterForm = this.fb.group({
      outlet: [null],
      amtQty: [''],
      total: [null],
      daysRange: [null],
      quarter: [null],
      customDate: [null]
    });
  }

}
