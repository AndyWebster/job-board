import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  links = ['My Jobs', 'Posts', 'Profile'];

  constructor() { }

  ngOnInit() {
  }

}
