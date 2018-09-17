import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public http: HttpClient) {}
  ping() {
    this.http
      .get('localhost:8080/')
      .subscribe(data => console.log(data), err => console.log(err));
  }
  title = 'app';
}
