import { Component, OnInit } from '@angular/core';

import { Job } from '../../job';
import { JobsService } from '../../services/jobs.service';
import { MessageService } from '../../services/message.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export interface ValueTable {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  
  jobs: Job[];
  keywords = ""
  locations = [];
  filterSalary: Number;
  filterLocation: String;
  filterDate: Date;

  constructor(
    private jobservice: JobsService,
    public messageService: MessageService,
    private adapter: DateAdapter<any>
    ) { }

  ngOnInit() {
    this.getJobs();
    this.adapter.setLocale('fr');

  }



  getJobs(): void {
    this.jobservice
    .getJobs()
    .subscribe((data: Job[]) => {
      this.jobs = data;
      this.setLocations(data);
    })
  }
 
  setLocations(data){
    var i;
    for(i=0; i < data.length; i++){
      if(!this.locations.includes(data[i].location)){
        this.locations.push(data[i].location)
      }
    };
  }

  searchJobs(): void {
    if(this.keywords.length){
      let keywordArray = this.keywords.split(" ");
      this.jobservice
      .searchJobs(keywordArray)
      .subscribe((data: Job[]) => {
        this.jobs = data;
        this.setLocations(data);
      })
    } else {
      this.getJobs();
    }
    
  }

  salaries: ValueTable[] = [
    {value: '5000-0', viewValue: '5000'},
    {value: '10000-1', viewValue: '10,000'},
    {value: '15000-2', viewValue: '15,000'},
    {value: '20000-2', viewValue: '20,000'},
    {value: '25000-2', viewValue: '25,000'},
    {value: '30000-2', viewValue: '30,000'},
    {value: '40000-2', viewValue: '40,000'},
    {value: '50000-2', viewValue: '50,000'},
    {value: '60000-2', viewValue: '60,000'},
    {value: '70000-2', viewValue: '70,000'}
  ];

  
}

      

  

