import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {
  ContentControllerService,
  SalesReportControllerService,
  SalesReportRequestParams
} from '../typescript-angular-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  outletList: any = [];

  chartFilterForm: FormGroup;
  constructor(private fb: FormBuilder,
              private contentControllerService: ContentControllerService,
              private salesReportControllerService: SalesReportControllerService) { }

  cardList: any = [{
    title: 'Food Sale',
    categoryIcon: 'fa fa-glass',
    categoryTitle: 'Food',
    count: '10239',
    unitType: 'Quantity'
  }, {
    title: 'Beverage Sale',
    categoryIcon: 'fa fa-glass',
    categoryTitle: 'Liquor',
    count: '23434',
    unitType: 'Quantity'
  }, {
    title: 'Hookah Sale',
    categoryIcon: 'fa fa-glass',
    categoryTitle: 'Liquor',
    count: '3434',
    unitType: 'Quantity'
  }, {
    title: 'Buffet Sale',
    categoryIcon: 'fa fa-glass',
    categoryTitle: 'Liquor',
    count: '4234',
    unitType: 'Quantity'
  }, {
    title: 'Liquor Sale',
    categoryIcon: 'fa fa-glass',
    categoryTitle: 'Liquor',
    count: '13123',
    unitType: 'Quantity'
  }];

  ngOnInit() {

    this.contentControllerService.getAllLocationsUsingGET().subscribe(obj => {
      this.outletList = obj;
    });
    this.chartFilterForm = this.fb.group({
      outlet: [[]],
      amtQty: [false],
      total: [null],
      daysRange: [null],
      quarter: [null],
      customDate: [null]
    });

  }

  fetchData() {
    console.log(this.chartFilterForm);
    const reportStartDate = '2022-01-01';
    const reportToDate = '2022-01-03';
    const value = this.chartFilterForm.value.amtQty ? 'Quantity' : 'Amount';
    const outletList: any = [];
    this.chartFilterForm.value.outlet.forEach( obj => {
        outletList.push(obj.key);
    });
    const data: SalesReportRequestParams =  {compareLastYear: false, outlet: outletList.join(','),
       startDate: reportStartDate, toDate: reportToDate, valueType: value };
    this.salesReportControllerService.getReportBeverageUsingPOST( data).subscribe(response => {
      console.log(response);
    });
  }
}
