import { Component, OnInit } from '@angular/core';
import {FormControl, Validators } from '@angular/forms';
import { Job } from '../../job';
import { JobsService } from '../../services/jobs.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

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

  constructor(
    private jobsservice: JobsService,
    public messageService: MessageService,
    private router: Router) { }

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
      this.messageService.showMessage('Your job was successfully posted');
      this.router.navigate(['/my-jobs']);
    }
    
    
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
