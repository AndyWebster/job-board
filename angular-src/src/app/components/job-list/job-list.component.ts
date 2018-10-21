import { Component, OnInit } from '@angular/core';

import { Job } from '../../job';
import { JobsService } from '../../services/jobs.service';
import { MessageService } from '../../services/message.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { trigger, state, style, animate, transition, keyframes, query, stagger } from '@angular/animations';


export interface ValueTable {
  value: number;
  viewValue: String;
}


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  animations: [
    trigger('slideInOut', [
      transition('void => *', [
        query('mat-card',style({transform: 'translateX(50%)', opacity: 0})),
        query('mat-card',
          stagger('600ms', [
            animate('300ms ease-in-out', style({transform: 'translateX(0%)', opacity: 1}))
        ]))
      ]),
      transition('* => void', [
        query('mat-card',
          stagger('600ms', [
            animate('400ms ease-in-out', style({transform: 'translateX(-100%)', opacity: 0}))
        ]))
      ]),
    ])
      
  ]
})
export class JobListComponent implements OnInit {
  
  jobs: Job[];
  show = false;
  keywords = ""
  locations = [];
  
  // Filter variables
  filterDate: Date = null;
  filterLocation: string = null;
  filterSalary: number = null;

  get stateName(){
    return this.show ? 'show' : 'hide'
  }

  constructor(
    private jobservice: JobsService,
    public messageService: MessageService,
    private adapter: DateAdapter<any>,

    ) { }

  ngOnInit() {
    this.getJobs();
    this.adapter.setLocale('gb');

  }

  clearFilters(){
    this.filterDate = null;
    this.filterLocation = null;
    this.filterSalary = null;
  }

/*   dateFilter(date){
    if(!this.filterDate) return true
    else return this.adapter.compareDate(this.filterDate, date);
  } */

  salaryFilter(salary){
    if(this.filterSalary != null && salary < this.filterSalary) return false
    else return true;
  }
  locationFilter(location){
    if(!this.filterLocation) return true
    else return this.filterLocation == location
  }

  getJobs(): void {
    this.jobservice
    .getJobs()
    .subscribe((data: Job[]) => {
      this.jobs = [];
      this.jobs = data;
      this.setLocations(data);
    })
  }
 
  setLocations(data){
    var i;
    for(i=0; i < data.length; i++){
      let place = data[i].location
      if(!this.locations.includes(place)){
        this.locations.push(place)
      }
    };
  }

  searchJobs(): void {
    if(this.keywords.length){
      let keywordArray = this.keywords.split(" ");
      this.jobservice
      .searchJobs(keywordArray)
      .subscribe((data: Job[]) => {
        this.jobs = [];
        this.jobs = data;
        this.setLocations(data);
      })
    } else {
      this.getJobs();
    }
    
  }

  salaries: ValueTable[] = [
    {value: 5000, viewValue: '5000'},
    {value: 10000, viewValue: '10,000'},
    {value: 15000, viewValue: '15,000'},
    {value: 20000, viewValue: '20,000'},
    {value: 25000, viewValue: '25,000'},
    {value: 30000, viewValue: '30,000'},
    {value: 40000, viewValue: '40,000'},
    {value: 50000, viewValue: '50,000'},
    {value: 60000, viewValue: '60,000'},
    {value: 70000, viewValue: '70,000'}
  ];

  
}

      

  

