import { Component, OnInit } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import { Job } from '../../job';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);


  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  job = new Job();

  constructor(private jobsservice: JobsService) { }

  ngOnInit() {
  }

  createJob() {
    // TODO more robust form validation
    if (!this.job.title) {
      console.log("title required")
      //TODO error message
    } else {
      console.log(this.job)
      this.jobsservice.postJob(this.job);
      //TODO call service function
    }
    // TODO check if poster wants to "save for later" or "Post now".
    
  }



  resetForm() {
    this.job.title = '';
    this.job.description = '';
    this.job.company = '';
    this.job.title = '';
    this.job.salary = null;
    this.job.location = '';
  }
}
