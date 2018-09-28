import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JobsService } from '../../services/jobs.service';
import { MessageService } from '../../services/message.service';
import { Job } from '../../job';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  user:any;
  jobs: Job[];
  
  constructor(
    private authService: AuthService,
    private jobservice: JobsService,
    public messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getProfile();
  };

  getProfile() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.getJobs();
    },
    err => {
      console.log(err);
      return false;
    }
    )};

  getJobs(): void {

    this.jobservice
    .findJobs(JSON.stringify(this.user.jobs))
    .subscribe((data: Job[]) => {
      this.jobs = data;
    })
  };

   // TODO Breakpoints for wide monitors

   deleteJob(id){
    
    if (this.jobservice.deleteJob(id)) {
      this.messageService.showMessage('Success');
      this.getJobs();
    } else {
      this.messageService.showError('Something went wrong');
    };
  }
}