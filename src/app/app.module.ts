import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CardcontainerComponent } from './cardcontainer/cardcontainer.component';

import { ApiModule } from './typescript-angular-client';
import {HttpClientModule} from '@angular/common/http';
import { SidebarcontainerComponent } from './sidebarcontainer/sidebarcontainer.component';
import { HeadercontainerComponent } from './headercontainer/headercontainer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FiltercontainerComponent } from './filtercontainer/filtercontainer.component';
import {HighchartsChartModule} from 'highcharts-angular';
import { PaxBillsCustomerReportComponent } from './pax-bills-customer-report/pax-bills-customer-report.component';
import { AllFoodSaleReportComponent } from './all-food-sale-report/all-food-sale-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    CardcontainerComponent,
    SidebarcontainerComponent,
    HeadercontainerComponent,
    FiltercontainerComponent,
    PaxBillsCustomerReportComponent,
    AllFoodSaleReportComponent,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    HttpClientModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    MatNativeDateModule, MatDatepickerModule, MatInputModule, MatProgressSpinnerModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
