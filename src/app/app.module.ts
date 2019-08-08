import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    ChartModule,
    MatIconModule,
    FontAwesomeModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
