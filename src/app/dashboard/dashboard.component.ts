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

  cardList: any = [];
  chartData = {dineIn: [0, 0, 0, 0, 0], delivery: [0, 0, 0, 0, 0]};



  ngOnInit() {

    this.contentControllerService.getAllLocationsUsingGET().subscribe(obj => {
      this.outletList = obj;
    });
    this.chartFilterForm = this.fb.group({
      outlet: [[]],
      amtQty: [false],
      total: [null],
      daysRange: ['Quarter'],
      quarter: ['0'],
      customDate: [null]
    });
    this.fetchData();

  }

  fetchData() {
    console.log(this.chartFilterForm);

    const quarterMonth = [0,3,6,9];
    const quarterDays = [31,30,30,31];

    let reportStartDate;
    let reportToDate;

    console.log(this.chartFilterForm.value.daysRange);
    if (this.chartFilterForm.value.daysRange === 'Last 10 Days') {
      const currentDate = new Date();
      reportStartDate = new Date(currentDate.getTime() - 10*24*60*60*1000).toISOString().split('T')[0];
      reportToDate = currentDate.toISOString().split('T')[0];
    } else if (this.chartFilterForm.value.daysRange === 'Current Month') {
      const currentDate = new Date();
      reportToDate = currentDate.toISOString().split('T')[0];
      currentDate.setDate(1);
      reportStartDate = currentDate.toISOString().split('T')[0];
    } else if (this.chartFilterForm.value.daysRange === 'Quarter') {
      const currentDate = new Date();
      currentDate.setDate(1);
      currentDate.setMonth(quarterMonth[this.chartFilterForm.value.quarter]);
      reportStartDate = currentDate.toISOString().split('T')[0];
      currentDate.setDate(quarterDays[this.chartFilterForm.value.quarter]);
      currentDate.setMonth(quarterMonth[this.chartFilterForm.value.quarter] + 2);
      reportToDate = currentDate.toISOString().split('T')[0];
    } else {
      reportStartDate = '2022-01-01';
      reportToDate = '2022-01-03';
    }

    const value = this.chartFilterForm.value.amtQty ? 'Quantity' : 'Amount';
    const outletList: any = [];
    this.chartFilterForm.value.outlet.forEach( obj => {
        outletList.push(obj.key);
    });
    const data: SalesReportRequestParams =  {compareLastYear: false, outlet: outletList.join(','),
       startDate: reportStartDate, toDate: reportToDate, valueType: value };
    this.salesReportControllerService.getReportFoodUsingPOST( data).subscribe(response => {
      this.foodDelivery = response['Food Sale HD'].key;
      this.foodDineIn = response['Food Sale DI'].key;
      this.reCalculateCards();
    });
    this.salesReportControllerService.getReportBeverageUsingPOST( data).subscribe(response => {
      this.beverageDelivery = response['Beverage Sale HD'].key;
      this.beverageDineIn = response['Beverage Sale DI'].key;
      this.reCalculateCards();
    });
    this.salesReportControllerService.getReportHookahUsingPOST( data).subscribe(response => {
      this.hookahDelivery = response['Hookah Sale HD'].key;
      this.hookahDineIn = response['Hookah Sale DI'].key;
      this.reCalculateCards();
    });
    this.salesReportControllerService.getReportLiquorUsingPOST( data).subscribe(response => {
      this.liquorDelivery = response['Liquor Sale HD'].key;
      this.liquorDineIn = response['Liquor Sale DI'].key;
      this.reCalculateCards();
    });

    this.salesReportControllerService.getReportBuffetUsingPOST( data).subscribe(response => {
      this.buffetDelivery = response['Buffet Sale HD'].key;
      this.buffetDineIn = response['Buffet Sale DI'].key;
      this.reCalculateCards();
    });
    this.salesReportControllerService.getReportTotalUsingPOST( data).subscribe(response => {
      this.totalDelivery = response['Total Sale HD'].key;
      this.totalDineIn = response['Total Sale DI'].key;
      this.reCalculateCards();
    });
  }

  totalDineIn: any = 0;
  totalDelivery: any = 0;
  foodDineIn: any = 0;
  foodDelivery: any = 0;
  beverageDineIn: any = 0;
  beverageDelivery: any = 0;
  hookahDineIn: any = 0;
  hookahDelivery: any = 0;
  buffetDineIn: any = 0;
  buffetDelivery: any = 0;
  liquorDineIn: any = 0;
  liquorDelivery: any = 0;

  reCalculateCards() {
    this.chartData = {
      dineIn: [this.totalDineIn, this.foodDineIn, this.beverageDineIn, this.hookahDineIn, this.buffetDineIn, this.liquorDineIn],
      delivery: [this.totalDelivery, this.foodDelivery, this.beverageDelivery, this.hookahDelivery, this.buffetDelivery, this.liquorDelivery]
    };

    this.cardList = [{
      title: 'Total Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: 'Delivery ('+this.totalDelivery+')',
      count: this.totalDineIn,
      unitType: 'Quantity'
    },{
      title: 'Food Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: 'Delivery ('+this.foodDelivery+')',
      count: this.foodDineIn,
      unitType: 'Quantity'
    }, {
      title: 'Beverage Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: 'Delivery ('+this.beverageDelivery+')',
      count: this.beverageDineIn,
      unitType: 'Quantity'
    }, {
      title: 'Hookah Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: 'Delivery ('+this.hookahDelivery+')',
      count: this.hookahDineIn,
      unitType: 'Quantity'
    }, {
      title: 'Buffet Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: 'Delivery ('+this.buffetDelivery+')',
      count: this.buffetDineIn,
      unitType: 'Quantity'
    }, {
      title: 'Liquor Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: 'Delivery ('+this.liquorDelivery+')',
      count: this.liquorDineIn,
      unitType: 'Quantity'
    }];
  }
}
