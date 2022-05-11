import {Component, Input, OnInit} from '@angular/core';
import {
  SalesReportControllerService,
  SalesReportRequestParams
} from '../typescript-angular-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading;

  totalPax;
  billCount;
  customers;

  constructor(private salesReportControllerService: SalesReportControllerService) { }

  cardList: any = [];
  chartData: any = {thisYear: [0, 0, 0, 0, 0, 0], compareYear: [0, 0, 0, 0, 0, 0]};

  selectionData: any ;

  compareData: any ;

  resetData() {
    this.selectionData = {
      total: 0,
      food: 0,
      beverage: 0,
      hookah: 0,
      buffet: 0,
      liquor: 0
    };

    this.compareData = {
      total: 0,
      food: 0,
      beverage: 0,
      hookah: 0,
      buffet: 0,
      liquor: 0
    };
  }



  ngOnInit() {
    this.resetData();
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
    }, {
      title: 'Total Sale',
      totalValue: this.selectionData.total,
      categoryValue: this.selectionData.total,
      compareValue: this.compareData.total
    }];
  }

  getValue( obj) {
    if (obj) {
      return obj;
    } else {
      return 0;
    }
  }



  applyFilterData(filterData: any) {
    this.loading = true;

    const quarterMonth = [0, 3, 6, 9];
    const quarterDays = [31, 30, 30, 31];

    let reportStartDate;
    let reportToDate;

    if (filterData.daysRange === 'CurrentMonth') {
      const currentDate = new Date();
      reportToDate = currentDate.toISOString().split('T')[0];
      currentDate.setDate(1);
      reportStartDate = currentDate.toISOString().split('T')[0];
    } else if (filterData.daysRange === 'Quarter') {
      const currentDate = new Date();
      currentDate.setDate(1);
      currentDate.setMonth(quarterMonth[filterData.quarter]);
      reportStartDate = currentDate.toISOString().split('T')[0];
      currentDate.setDate(quarterDays[filterData.quarter]);
      currentDate.setMonth(quarterMonth[filterData.quarter] + 2);
      reportToDate = currentDate.toISOString().split('T')[0];
    } else if (filterData.daysRange === 'CustomDate') {
      reportStartDate = this.convertToDate(filterData.customDateStart);
      reportToDate = this.convertToDate(filterData.customDateEnd);
    }

    if (filterData.saleMode === 'average') {
      filterData.saleMode = '1,2,3,4,5,6,7';
    } else if (filterData.saleMode === 'weekdays') {
      filterData.saleMode = filterData.saleModeDays.join(',');
    }

    const data: SalesReportRequestParams =  {
      saleType: filterData.saleType,
      saleMode: filterData.saleMode,
      outlet: filterData.outletList,
      startDate: reportStartDate,
      toDate: reportToDate,
      compareLastYear: filterData.compareLastYear,
      compareStartDate: this.convertToDate(filterData.compareStartDate),
      compareToDate: this.convertToDate(filterData.compareEndDate)
    };


    this.salesReportControllerService.getPaxUsingPOST(data).subscribe(response => {
      this.totalPax = response;
      console.log('totalPax'+this.totalPax);
    });

    this.salesReportControllerService.getNoOfBillsUsingPOST(data).subscribe(response => {
      this.billCount = response;
      console.log('billCount'+this.billCount);
    });

    this.salesReportControllerService.getNoOfCustomersUsingPOST(data).subscribe(response => {
      this.customers = response;
      console.log('customers'+this.customers);

    });

    this.salesReportControllerService.getReportUsingPOST(data).subscribe(response => {
      this.resetData();
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
}
