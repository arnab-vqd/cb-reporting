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
  chartData:any = {dineIn: [0, 0, 0, 0, 0], delivery: [0, 0, 0, 0, 0]};

  selectionData: any = {
    totalDineIn: 0,
    totalDelivery: 0,
    foodDineIn: 0,
    foodDelivery: 0,
    beverageDineIn: 0,
    beverageDelivery: 0,
    hookahDineIn: 0,
    hookahDelivery: 0,
    buffetDineIn: 0,
    buffetDelivery: 0,
    liquorDineIn: 0,
    liquorDelivery: 0
  };

  compareData: any = {
    totalDineIn: 0,
    totalDelivery: 0,
    foodDineIn: 0,
    foodDelivery: 0,
    beverageDineIn: 0,
    beverageDelivery: 0,
    hookahDineIn: 0,
    hookahDelivery: 0,
    buffetDineIn: 0,
    buffetDelivery: 0,
    liquorDineIn: 0,
    liquorDelivery: 0
  };



  ngOnInit() {

    this.contentControllerService.getAllLocationsUsingGET().subscribe(obj => {
      this.outletList = obj;
    });
    this.chartFilterForm = this.fb.group({
      outlet: [[]],
      total: ['total'],
      daysRange: ['Quarter'],
      quarter: ['0'],
      customDate: [null],
      calculationType: [false],
      compareLastYear: [false],
    });
    this.fetchData();

  }

  fetchData() {
    console.log(this.chartFilterForm);

    const quarterMonth = [0, 3, 6, 9];
    const quarterDays = [31, 30, 30, 31];

    let reportStartDate;
    let reportToDate;

    if (this.chartFilterForm.value.daysRange === 'Last 10 Days') {
      const currentDate = new Date();
      reportStartDate = new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
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

    const value = this.chartFilterForm.value.calculationType ? 'Mrp' : 'Quantity' ;
    const outletList: any = [];
    this.chartFilterForm.value.outlet.forEach( obj => {
        outletList.push(obj.key);
    });
    const data: SalesReportRequestParams =  {compareLastYear: this.chartFilterForm.value.compareLastYear, outlet: outletList.join(','),
       startDate: reportStartDate, toDate: reportToDate, valueType: value };

    this.salesReportControllerService.getReportFoodUsingPOST( data).subscribe(response => {
      this.selectionData.foodDelivery = response['Food Sale HD'].key;
      this.selectionData.foodDineIn = response['Food Sale DI'].key;
      if (data.compareLastYear) {
        this.compareData.foodDelivery = response['Food Sale HD LY'].key;
        this.compareData.foodDineIn = response['Food Sale DI LY'].key;
      }
      this.reCalculateCards();
    });
    this.salesReportControllerService.getReportBeverageUsingPOST( data).subscribe(response => {
      this.selectionData.beverageDelivery = response['Beverage Sale HD'].key;
      this.selectionData.beverageDineIn = response['Beverage Sale DI'].key;
      if (data.compareLastYear) {
        this.compareData.beverageDelivery = response['Beverage Sale HD LY'].key;
        this.compareData.beverageDineIn = response['Beverage Sale DI LY'].key;
      }
      this.reCalculateCards();
    });
    this.salesReportControllerService.getReportHookahUsingPOST( data).subscribe(response => {
      this.selectionData.hookahDelivery = response['Hookah Sale HD'].key;
      this.selectionData.hookahDineIn = response['Hookah Sale DI'].key;
      if (data.compareLastYear) {
        this.compareData.hookahDelivery = response['Hookah Sale HD LY'].key;
        this.compareData.hookahDineIn = response['Hookah Sale DI LY'].key;
      }
      this.reCalculateCards();
    });
    this.salesReportControllerService.getReportLiquorUsingPOST( data).subscribe(response => {
      this.selectionData.liquorDelivery = response['Liquor Sale HD'].key;
      this.selectionData.liquorDineIn = response['Liquor Sale DI'].key;
      if (data.compareLastYear) {
        this.compareData.liquorDelivery = response['Liquor Sale HD LY'].key;
        this.compareData.liquorDineIn = response['Liquor Sale DI LY'].key;
      }
      this.reCalculateCards();
    });
    this.salesReportControllerService.getReportBuffetUsingPOST( data).subscribe(response => {
      this.selectionData.buffetDelivery = response['Buffet Sale HD'].key;
      this.selectionData.buffetDineIn = response['Buffet Sale DI'].key;
      if (data.compareLastYear) {
        this.compareData.buffetDelivery = response['Buffet Sale HD LY'].key;
        this.compareData.buffetDineIn = response['Buffet Sale DI LY'].key;
      }
      this.reCalculateCards();
    });
    this.salesReportControllerService.getReportTotalUsingPOST( data).subscribe(response => {
      this.selectionData.totalDelivery = response['Total Sale HD'].key;
      this.selectionData.totalDineIn = response['Total Sale DI'].key;
      if (data.compareLastYear) {
        this.compareData.totalDelivery = response['Total Sale HD LY'].key;
        this.compareData.totalDineIn = response['Total Sale DI LY'].key;
      }
      this.reCalculateCards();
    });
  }

  reCalculateCards() {
    if (this.chartFilterForm.value.compareLastYear) {
      this.chartData = {
        dineIn: [this.selectionData.totalDineIn, this.selectionData.foodDineIn, this.selectionData.beverageDineIn,
          this.selectionData.hookahDineIn, this.selectionData.buffetDineIn, this.selectionData.liquorDineIn],
        delivery: [this.selectionData.totalDelivery, this.selectionData.foodDelivery, this.selectionData.beverageDelivery,
          this.selectionData.hookahDelivery, this.selectionData.buffetDelivery, this.selectionData.liquorDelivery],
        dineInCompare: [this.compareData.totalDineIn, this.compareData.foodDineIn, this.compareData.beverageDineIn,
          this.compareData.hookahDineIn, this.compareData.buffetDineIn, this.compareData.liquorDineIn],
        deliveryCompare: [this.compareData.totalDelivery, this.compareData.foodDelivery, this.compareData.beverageDelivery,
          this.compareData.hookahDelivery, this.compareData.buffetDelivery, this.compareData.liquorDelivery]
      };
    } else {
      this.chartData = {
        dineIn: [this.selectionData.totalDineIn, this.selectionData.foodDineIn, this.selectionData.beverageDineIn,
          this.selectionData.hookahDineIn, this.selectionData.buffetDineIn, this.selectionData.liquorDineIn],
        delivery: [this.selectionData.totalDelivery, this.selectionData.foodDelivery, this.selectionData.beverageDelivery,
          this.selectionData.hookahDelivery, this.selectionData.buffetDelivery, this.selectionData.liquorDelivery]
      };
    }

    this.cardList = [{
      title: 'Total Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: this.selectionData.totalDelivery,
      count: this.selectionData.totalDineIn,
      unitType: this.chartFilterForm.value.calculationType ? 'Amount' : 'Quantity'
    }, {
      title: 'Food Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: this.selectionData.foodDelivery,
      count: this.selectionData.foodDineIn,
      unitType: this.chartFilterForm.value.calculationType ? 'Amount' : 'Quantity'
    }, {
      title: 'Beverage Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: this.selectionData.beverageDelivery,
      count: this.selectionData.beverageDineIn,
      unitType: this.chartFilterForm.value.calculationType ? 'Amount' : 'Quantity'
    }, {
      title: 'Hookah Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: this.selectionData.hookahDelivery,
      count: this.selectionData.hookahDineIn,
      unitType: this.chartFilterForm.value.calculationType ? 'Amount' : 'Quantity'
    }, {
      title: 'Buffet Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: this.selectionData.buffetDelivery,
      count: this.selectionData.buffetDineIn,
      unitType: this.chartFilterForm.value.calculationType ? 'Amount' : 'Quantity'
    }, {
      title: 'Liquor Sale',
      categoryIcon: 'fa fa-truck',
      categoryTitle: this.getValue(this.selectionData.liquorDelivery),
      count: this.selectionData.liquorDineIn,
      unitType: this.chartFilterForm.value.calculationType ? 'Amount' : 'Quantity'
    }];
  }

  getValue( obj) {
    if (obj) {
      return obj;
    } else {
      return 0;
    }
  }
}
