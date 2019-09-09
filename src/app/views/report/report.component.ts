import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComplexityService } from '../../services/complexity.service';
import { ComplexityStatement } from '../../modal/statementComplexity';
import { Row } from 'primeng/components/common/shared';
import { CsvDataService } from '../../services/CsvDataService';
// import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


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
  tableArray: ComplexityStatement[];
  row: ComplexityStatement = {};
  table:any;

  constructor(private router: Router, private complexityService: ComplexityService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.fileName = params.name;
    });

    // this.setArray([{line: 'line'}, {line: 'line'}, {line: 'line'}]
    // );
  }

  ngOnInit() {

    this.cols = [
      { field: 'line', header: 'Line no' },
      { field: 'code', header: 'Program statements ' },
      { field: 'ctcTokens', header: 'Tokens identified under the size factor' },
      { field: 'cs', header: 'Cs' },
      { field: 'ctc', header: 'Ctc' },
      { field: 'cnc', header: 'Cnc' },
      { field: 'ci', header: 'Ci' },
      { field: 'TW', header: 'TW' },
      { field: 'cps', header: 'Cps' },
      { field: 'cr', header: 'Cr' }
    ];

    this.complexityService.getcomplexityValue(this.fileName).subscribe(result => {
      let complexityValue;

      complexityValue = result;

      this.tableArray = complexityValue.measure;
      this.setArray(complexityValue.measure);
      this.totalCi = complexityValue.totalCi;
      console.log(this.totalCi);
      this.totalCtc = complexityValue.totalCp;
      this.totalCs = complexityValue.totalCs;

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

      console.log(result);
      // this.setComplexityArry(complexityValue, ciValues);
    });
  }

  setArray( array: any ) {
    this.tableArray = array;
  }

  download( ) {
    // CsvDataService.exportToCsv('report.csv', this.tableArray);
  }

  // public captureScreen() {
  //   var data = document.getElementById('exportThis');
  //   html2canvas(data).then(canvas => {
  //     // Few necessary setting options
  //     var imgWidth = 208;
  //     var pageHeight = 295;
  //     var imgHeight = canvas.height * imgWidth / canvas.width;
  //     var heightLeft = imgHeight;

  //     const contentDataURL = canvas.toDataURL('image/png')
  //     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //     var position = 0;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //     pdf.save('MYPdf.pdf'); // Generated PDF
  //   });
  // }
}

