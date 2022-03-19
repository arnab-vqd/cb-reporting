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
    this.reCalculateCards();
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
  }

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
      dineIn: [this.foodDineIn, this.beverageDineIn, this.hookahDineIn, this.buffetDineIn, this.liquorDineIn],
      delivery: [this.foodDelivery, this.beverageDelivery, this.hookahDelivery, this.buffetDelivery, this.liquorDelivery]
    };

    this.cardList = [{
      title: 'Food Sale',
      categoryIcon: 'fa fa-glass',
      categoryTitle: 'Delivery ('+this.foodDelivery+')',
      count: this.foodDineIn,
      unitType: 'Quantity'
    }, {
      title: 'Beverage Sale',
      categoryIcon: 'fa fa-glass',
      categoryTitle: 'Delivery ('+this.beverageDelivery+')',
      count: this.beverageDineIn,
      unitType: 'Quantity'
    }, {
      title: 'Hookah Sale',
      categoryIcon: 'fa fa-glass',
      categoryTitle: 'Delivery ('+this.hookahDelivery+')',
      count: this.hookahDineIn,
      unitType: 'Quantity'
    }, {
      title: 'Buffet Sale',
      categoryIcon: 'fa fa-glass',
      categoryTitle: 'Delivery ('+this.buffetDelivery+')',
      count: this.buffetDineIn,
      unitType: 'Quantity'
    }, {
      title: 'Liquor Sale',
      categoryIcon: 'fa fa-glass',
      categoryTitle: 'Delivery ('+this.liquorDelivery+')',
      count: this.liquorDineIn,
      unitType: 'Quantity'
    }];
  }
}
