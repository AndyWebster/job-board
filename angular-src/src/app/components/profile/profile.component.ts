import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  displayedColumns: string[] = ['name', 'delete', 'download'];
  uri = 'http://localhost:8080/upload';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    });
  }

  download(path){
    this.http.get(`${this.uri}/${path}`).subscribe(res => {
      console.log(res);
    })
    
  }

  delete(path){
    this.http.delete(`${this.uri}/${path}`).subscribe(res => {
      
    })
    this.authService.deleteFile(this.user["_id"]).subscribe(res => {this.getUser();})
  }
}
