import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatIconModule} from '@angular/material/icon';
import { ChartModule } from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule  } from 'angular-bootstrap-md';
import { UploadComponent } from './views/upload/upload.component';
import { ReportComponent } from './views/report/report.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ReportComponent,
    P404Component,
    P500Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
    DialogModule,
    ChartModule,
    MatIconModule,
    FontAwesomeModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
