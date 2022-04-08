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

  cityList: any = [];
  outletList: any = [];

  loading;

  chartFilterForm: FormGroup;
  constructor(private fb: FormBuilder,
              private contentControllerService: ContentControllerService,
              private salesReportControllerService: SalesReportControllerService) { }

  cardList: any = [];
  chartData: any = {thisYear: [0, 0, 0, 0, 0, 0], compareYear: [0, 0, 0, 0, 0,0]};

  selectionData: any = {
    total: 0,
    food: 0,
    beverage: 0,
    hookah: 0,
    buffet: 0,
    liquor: 0
  };

  compareData: any = {
    total: 0,
    food: 0,
    beverage: 0,
    hookah: 0,
    buffet: 0,
    liquor: 0
  };

  fetchCity() {
    this.contentControllerService.getAllCitiesUsingGET().subscribe(obj => {
      this.cityList = obj;
      this.fetchOutlets();
    });
  }

  fetchOutlets() {

    const city = this.chartFilterForm.value.city;
    this.contentControllerService.getAllLocationsUsingGET(city ? city.key : '').subscribe(obj => {
      this.outletList = obj;
    });
  }

  ngOnInit() {

    this.chartFilterForm = this.fb.group({
      city: [],
      outlet: [],
      saleType: ['totalSale'],
      saleMode: ['total'],
      daysRange: ['CurrentMonth'],
      quarter: ['0'],
      customDateStart: [''],
      customDateEnd: [''],
      compareLastYear: ['Same Last Year'],
      compareStartDate: [''],
      compareEndDate: ['']
    });
    this.fetchCity();
  }

  fetchData() {

    this.loading = true;

    const quarterMonth = [0, 3, 6, 9];
    const quarterDays = [31, 30, 30, 31];

    let reportStartDate;
    let reportToDate;

    if (this.chartFilterForm.value.daysRange === 'CurrentMonth') {
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
    } else if (this.chartFilterForm.value.daysRange === 'CustomDate') {
      reportStartDate = this.convertToDate(this.chartFilterForm.value.customDateStart);
      reportToDate = this.convertToDate(this.chartFilterForm.value.customDateEnd);
    }

    const outletList: any = [];
    if (this.chartFilterForm.value.outlet) {
      this.chartFilterForm.value.outlet.forEach( obj => {
        outletList.push(obj.key);
      });
    } else {
      this.outletList.forEach( obj => {
        outletList.push(obj.key);
      });
    }

    const data: SalesReportRequestParams =  {
      saleType: this.chartFilterForm.value.saleType,
      saleMode: this.chartFilterForm.value.saleMode,
      outlet: outletList.join(','),
      startDate: reportStartDate,
      toDate: reportToDate,
      compareLastYear: this.chartFilterForm.value.compareLastYear,
      compareStartDate: this.chartFilterForm.value.compareStartDate,
      compareToDate: this.chartFilterForm.value.compareEndDate

    };

    this.salesReportControllerService.getReportUsingPOST(data).subscribe(response => {
      this.selectionData.total = response['Total Sale'].key;
      this.selectionData.food = response['Food Sale'].key;
      this.selectionData.beverage = response['Beverage Sale'].key;
      this.selectionData.buffet = response['Buffet Sale'].key;
      this.selectionData.hookah = response['Hookah Sale'].key;
      this.selectionData.liquor = response['Liquor Sale'].key;
      this.compareData.total = response['Total SaleLY'].key;
      this.compareData.food = response['Food SaleLY'].key;
      this.compareData.beverage = response['Beverage SaleLY'].key;
      this.compareData.buffet = response['Buffet SaleLY'].key;
      this.compareData.hookah = response['Hookah SaleLY'].key;
      this.compareData.liquor = response['Liquor SaleLY'].key;
      this.reCalculateCards();
      this.loading = false;
    });

  }



  convertToDate(date: string) {
    if (date) {
      return new Date(date).toISOString().split('T')[0];
    }
    return '';
  }

  reCalculateCards() {
    this.chartData = {
      thisYear: [this.selectionData.total, this.selectionData.food, this.selectionData.beverage,
        this.selectionData.hookah, this.selectionData.buffet, this.selectionData.liquor],
      compareYear: [this.compareData.total, this.compareData.food, this.compareData.beverage,
        this.compareData.hookah, this.compareData.buffet, this.compareData.liquor],
    };


    this.cardList = [{
      title: 'Total Sale',
      totalValue: this.selectionData.total,
      categoryValue: this.selectionData.total,
      compareValue: this.compareData.total
    }, {
      title: 'Food Sale',
      totalValue: this.selectionData.total,
      categoryValue: this.selectionData.food,
      compareValue: this.compareData.food
    }, {
      title: 'Beverage Sale',
      totalValue: this.selectionData.total,
      categoryValue: this.selectionData.beverage,
      compareValue: this.compareData.beverage
    }, {
      title: 'Hookah Sale',
      totalValue: this.selectionData.total,
      categoryValue: this.selectionData.hookah,
      compareValue: this.compareData.hookah
    }, {
      title: 'Buffet Sale',
      totalValue: this.selectionData.total,
      categoryValue: this.selectionData.buffet,
      compareValue: this.compareData.buffet
    }, {
      title: 'Liquor Sale',
      totalValue: this.selectionData.total,
      categoryValue: this.selectionData.liquor,
      compareValue: this.compareData.liquor
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
