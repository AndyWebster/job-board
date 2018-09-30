import { Component, OnInit } from '@angular/core';
import { Job } from '../../job';
import { JobsService } from '../../services/jobs.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {


  job = new Job();



  constructor(
    private jobsservice: JobsService,
    public messageService: MessageService,
    private router: Router,
    ) { }

  ngOnInit(){

    
  }

  createJob() {
    // TODO more robust form validation
    if (!this.job.title || !this.job.company || !this.job.location || !this.job.description) {
      this.messageService.showError('Please fill out all required fields');

    } else {
      // Add current date to job
      this.job.date = Date();
      // this.job.owner = JSON.parse(JSON.stringify(this.user._id));

      // Post new job
      if (this.jobsservice.postJob(this.job)) {
        this.messageService.showMessage('Your job was successfully posted');
        this.resetForm()
        this.router.navigate(['dashboard']);
      } else {
        console.log('something went wrong');
      }

      /* this.jobsservice.postJob(this.job).subscribe(
        res => { 
          this.authService.addJob(res, this.job.owner).subscribe(
            res => {
              this.messageService.showMessage('Your job was successfully posted');
              console.log(res.status);
              this.resetForm()
            },
            error => {
              console.log(error);
            },
          )
        },
        error => {
          console.log(error);
        },
      ) */
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
