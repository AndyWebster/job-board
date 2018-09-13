import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Job } from '../job';
import { JOBS } from '../mock-jobs';


@Injectable({
  providedIn: 'root'
})
export class JobsService {
  
  uri = 'http://localhost:3000/joblists';

  constructor(private http: HttpClient) { 
  }

/*   getJobs() {
    return this.http.get(`${this.uri}/joblist`);
  } */

  getJobs() {

    return this.http.get(`${this.uri}`)
  }

  postJob(job) {

    // TODO - post job argument to db
    this.http.post(`${this.uri}/add`, job)
    .subscribe(res => console.log('Done'));
  }

  updateJob(job) {


  }
}
