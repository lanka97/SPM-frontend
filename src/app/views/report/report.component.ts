import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComplexityService } from '../../services/complexity.service';
import { ComplexityStatement } from '../../modal/statementComplexity';
import { Row } from 'primeng/components/common/shared';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  data: any;
  fileName: string;
  codeArray: any[];
  totalCi = 10;
  totalCtc = 10;
  totalCs = 10;
  totalCp = 10;
  statements: any[];
  cols: any[];
  complexityArry: any[];
  ciArry: any[];
  tableArry: any[] = [];
  tableArray: ComplexityStatement[] = [];
  row: ComplexityStatement = {};

  constructor(private router: Router, private complexityService: ComplexityService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.fileName = params.name;
      console.log(this.fileName);
    });
  }

  ngOnInit() {

    let ciValues;
    let complexityValue;

    this.complexityService.getCiValue(this.fileName).subscribe(res => {
      ciValues = res;
      // this.setCiArray(ciValues);
      this.complexityService.getcomplexityValue(this.fileName).subscribe (result => {
        complexityValue = result;
        this.setComplexityArry(complexityValue, ciValues);
      });
    });

    this.cols = [
      { field: 'lineNumber', header: 'Line no' },
      { field: 'statement', header: 'Program statements ' },
      { field: 'cscTokens', header: 'Tokens identified under the size factor' },
      { field: 'cs', header: 'Cs' },
      { field: 'ctc', header: 'Ctc' },
      { field: 'cnc', header: 'Cnc' },
      { field: 'ci', header: 'Ci' },
      { field: 'TW', header: 'TW' },
      { field: 'cps', header: 'Cpc' },
      { field: 'cr', header: 'Cr' }
    ];

    // for ( const ciStatement of ciArry.code) {
    //   this.row.lineNumber = ciStatement.number;
    //   this.row.statement = ciStatement.line;
    //   this.row.ci = ciStatement.ci;

    //   // console.log(ciStatement.number);
    //   for ( const statement of this.complexityArry ) {
    //     if (this.row.lineNumber == statement.no) {
    //       this.row.cs = statement.cs;
    //       this.row.ctc = statement.ctc;
    //       this.row.cnc = statement.cnc;
    //       this.row.cr = statement.cr;
    //       console.log(this.row);
    //     }
    //   }

    this.data = {
      labels: ['Ci', 'Ctc', 'Cs'],
      datasets: [
        {
          data: [this.totalCi, this.totalCtc, this.totalCs],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }

  setComplexityArry(complexityArray, ciArry ) {
    this.totalCi = ciArry.totalCi;
    this.ciArry = ciArry.code;
    this.complexityArry = complexityArray.code;

    this.totalCtc = complexityArray.totalCtc;
    this.totalCs = complexityArray.totalCs;
    this.totalCp = complexityArray.totalCp;
    console.log(this.totalCs);


    console.log( this.ciArry);
    
    for ( const ciStatement of ciArry.code) {
      console.log(ciStatement);
      this.row.lineNumber = ciStatement.number;
      this.row.statement = ciStatement.line;
      this.row.ci = ciStatement.Ci;

      // console.log(ciStatement.number);
      for ( const statement of this.complexityArry ) {
        if (this.row.lineNumber == statement.no) {
          this.row.cs = statement.cs;
          this.row.ctc = statement.ctc;
          this.row.cnc = statement.cnc;
          this.row.cr = statement.cr;
          this.row.cscTokens = statement.cscTokens;
          // console.log(this.row);
        }
      }

      this.tableArray.push(this.row);
      this.row = {};
    }

    // console.log(this.row)

    this.data = {
      labels: ['Ci', 'Ctc', 'Cs'],
      datasets: [
        {
          data: [this.totalCi, this.totalCtc, this.totalCs],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }



}
