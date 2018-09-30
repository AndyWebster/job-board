import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  job: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsservice: JobsService,
    public messageService: MessageService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.jobsservice.editJob(params['id']).subscribe(res => {
        this.job = res;
        this.job.date = Date();
      });
    });
  }

  updateJob() {
    
    if (!this.job.title || !this.job.company || !this.job.location || !this.job.description) {
      this.messageService.showError('Please fill out all required fields');
    } else { 
      this.route.params.subscribe(params => {
        this.jobsservice.updateJob(this.job, params['id'])
        .subscribe(
          res => {
          this.messageService.showMessage('Your post was successfully updated');
          this.job = res;
          this.router.navigate(['dashboard'])
        });
      });
    }
  }
}