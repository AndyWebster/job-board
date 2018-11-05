import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../url';
import 'rxjs/Rx';
import { User } from '../../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  displayedColumns: string[] = ['name', 'delete', 'download'];

  uri = `${url}/upload`;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUser();
  }



  getUser() {
    this.authService.getProfile().subscribe(data => {
      this.user = data["user"];
    });
  }

  download(filename){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    this.http.get(`${this.uri}/${filename}`, { headers: headers, responseType: 'blob' })
    .subscribe(
      response => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
            downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();

      })
  }

  delete(path){
    this.http.delete(`${this.uri}/${path}`).subscribe(res => {
      
    })
    this.authService.deleteFile(this.user["_id"]).subscribe(res => {this.getUser();})
  }
}
