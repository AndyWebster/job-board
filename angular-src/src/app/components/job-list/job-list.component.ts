import { Component, OnInit } from '@angular/core';

import { Job } from '../../job';
import { JobsService } from '../../services/jobs.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  
  jobs: Job[];

  constructor(
    private jobservice: JobsService,
    public messageService: MessageService,
    ) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs(): void {

    this.jobservice
    .getJobs()
    .subscribe((data: Job[]) => {
      this.jobs = data;
    })
  }
  more(job) {
    if(job.collapsed) {
      job.collapsed = false;
    } else {
      job.collapsed = true;
    }
  }

  apply() {
    
  }
 
}

      

  

