import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

    uploadID: any;
    uploadFileName: any;
    constructor(private router: Router, private http: HttpClient, private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
    }

    navReport() {
        this.router.navigate(['report', this.uploadFileName.fileName]);
    }

    uploadFile() {
        if ((document.getElementById('upload') as HTMLInputElement).files.length !== 0) {
            const path = (document.getElementById('upload') as HTMLInputElement).files[0];
            const name = (document.getElementById('upload') as HTMLInputElement).value.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');
            let formData = new FormData();
            formData.append('file', path);
            formData.set('fileName', name);
            this.spinner.show();
            this.http.post('http://localhost:8080/api/files', formData)
                .subscribe(data => {
                    this.uploadID = data;
                    this.uploadID = this.uploadID.id;
                    this.http.get('http://localhost:8080/api/files/download/' + this.uploadID)
                        .subscribe(data1 => {
                            this.uploadFileName = data1;
                            this.spinner.hide();
                            this.navReport();
                        });
                    }
                );
        } else {
            alert('Please Select File');
        }
    }
}
