import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { url } from '../../url';
import 'rxjs/Rx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
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

  ngAfterViewInit(){
    this.getUser();
  }

  getUser() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
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

  xdownloadFile(data: any, type: string) {
    var blob = new Blob([data], { type: type});
    console.log(blob);
    var url = window.URL.createObjectURL(blob);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }

  downloadFile(route: string, filename: string = null): void{

    const baseUrl = 'http://myserver/index.php/api';
    const token = 'my JWT';
    const headers = new HttpHeaders().set('authorization','Bearer '+token);
    this.http.get(baseUrl + route,{headers, responseType: 'blob' as 'json'}).subscribe(
        
    )
  }

  delete(path){
    this.http.delete(`${this.uri}/${path}`).subscribe(res => {
      
    })
    this.authService.deleteFile(this.user["_id"]).subscribe(res => {this.getUser();})
  }
}
