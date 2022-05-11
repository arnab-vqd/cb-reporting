import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ContentControllerService} from '../typescript-angular-client';

@Component({
  selector: 'app-filtercontainer',
  templateUrl: './filtercontainer.component.html',
  styleUrls: ['./filtercontainer.component.scss']
})
export class FiltercontainerComponent implements OnInit {

  private displayFilter = false;

  companyList: any = [];
  cityList: any = [];
  outletList: any = [];

  chartFilterForm: FormGroup;

  @Output()
  onFilterChange = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private contentControllerService: ContentControllerService) { }

  ngOnInit() {
    this.initializeForm();
    this.fetchCompany();
  }

  fetchCompany() {
    this.contentControllerService.getCompanyListUsingGET().subscribe(obj => {
      this.companyList = obj;
      this.fetchCity();
    });
  }

  fetchCity() {
    this.contentControllerService.getAllCitiesUsingGET(this.getCompanySelected()).subscribe(obj => {
      this.cityList = obj;
      this.fetchOutlets();
    });
  }

  fetchOutlets() {
    const city = this.chartFilterForm.value.city;
    this.contentControllerService.getAllLocationsUsingGET(city ? city.key : '', this.getCompanySelected()).subscribe(obj => {
      this.outletList = obj;
    });
  }

  initializeForm() {
    this.chartFilterForm = this.fb.group({
      company: [],
      city: [],
      outlet: [],
      saleType: ['totalSale'],
      saleMode: ['total'],
      saleModeDays: [['1', '2', '3', '4', '5', '6', '7']],
      daysRange: ['CurrentMonth'],
      quarter: ['0'],
      customDateStart: [''],
      customDateEnd: [''],
      compareLastYear: ['Same Last Year'],
      compareStartDate: [''],
      compareEndDate: ['']
    });
  }

  toggleFilterDisplay() {
    this.displayFilter = !this.displayFilter;
  }

  onSubmit() {
    const formData = {...this.chartFilterForm.value};

    const outletList: any = [];
    if (formData.outlet) {
      formData.outlet.forEach( obj => {
        outletList.push(obj.key);
      });
    } else {
      this.outletList.forEach( obj => {
        outletList.push(obj.key);
      });
    }
    formData.outletList = outletList.join(',');
    console.log(formData);
    this.onFilterChange.emit(formData);
  }

  private getCompanySelected() {

    const formData = {...this.chartFilterForm.value};

    const companyList: any = [];
    if (formData.company) {
        companyList.push(formData.company);
    } else {
      this.companyList.forEach( obj => {
        companyList.push(obj);
      });
    }

    return '\'' + companyList.join('\',\'') + '\'';
  }
}
