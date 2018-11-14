import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { cardSlide, cardOpenClose, cardFade, cardHideSHow } from '../../animations';

import { Job } from '../../job';
import { JobsService } from '../../services/jobs.service';
import { MessageService } from '../../services/message.service';
import {DateAdapter} from '@angular/material/core';
import { trigger, state, style, animate, transition, keyframes, query, stagger } from '@angular/animations';


export interface ValueTable {
  value: number;
  viewValue: String;
}


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
  animations: [ cardSlide, cardOpenClose, cardFade, cardHideSHow]
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  companies = [];
  keywords = "";
  locations = [];
  sortType = 'date';
  sortAscend = false;
  filtExpand = false;
  sortExpand = false;
  searchExpand = true;
  // Filter variables
  filterDate: Date = null;
  filterLocation: string = null;
  filterSalary: number = null;
  filterCompany: string = null;


  constructor(
    private jobservice: JobsService,
    public messageService: MessageService,
    private adapter: DateAdapter<any>,

    ) { 
      
    }

  ngOnInit() {
    this.getJobs();
    this.adapter.setLocale('gb');

  }

  sortDate(){
    if(this.sortAscend){
      this.jobs.sort(function(a, b){
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA > dateB ? 1 : -1;  
      })
    } else {
      this.jobs.sort(function(b, a){
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA > dateB ? 1 : -1;  
      })
    }
    
  }

  sortSalary(){
    if(this.sortAscend){
      this.jobs.sort(function(a, b){
        return a.salary-b.salary
      })
    } else {
      this.jobs.sort(function(b, a){
        return a.salary-b.salary
      })
    }
    
  }

  sortControl(){
    if (this.sortExpand){
      this.getJobs();
    }
    this.sortExpand = !this.sortExpand;
  }

  sortJobs(sortType?){
    if(sortType == 'date'){
      this.sortDate();
    } else if(sortType == 'salary'){
      this.sortSalary()
    }

  }

  clearFilters(){
    this.filterDate = null;
    this.filterLocation = null;
    this.filterSalary = null;
    this.filterCompany = null;
  }

  salaryFilter(salary){
    if(this.filterSalary != null && salary < this.filterSalary){
      return false
    } else {
      return true
    }
  }

  locationFilter(location){
    if(this.filterLocation == null){
      return true
    } else {
      return this.filterLocation == location
    }
  }

  companyFilter(company){
    if(this.filterCompany == null){
      return true
    } else {
      return this.filterCompany == company
    }
  }

  getJobs() {
    this.jobs = [];
    this.jobservice
    .getJobs()
    .subscribe((data: Job[]) => {
      
      this.setLocations(data);
      this.setCompanies(data);
      this.jobs = data
      this.sortJobs(this.sortType)
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

  setCompanies(data){
    var i;
    for(i=0; i < data.length; i++){
      let org = data[i].company
      if(!this.companies.includes(org)){
        this.companies.push(org)
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

      

  

