import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JobsService } from '../../services/jobs.service';
import { MessageService } from '../../services/message.service';
import { Job } from '../../job';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  cover: string;
  name: string;
}

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  user:any;
  jobs: Job[];
  displayedColumns: string[] = ['name', 'email', 'cover', 'cv', 'action'];
  applications: Object;
  active=false;
  filteredJobs: Job[];

  constructor(
    private authService: AuthService,
    private jobservice: JobsService,
    public messageService: MessageService,
    public dialog: MatDialog,
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
    if(this.user.jobs.length===0){
      this.active=false
    } else {
      this.jobservice
      .findJobs(JSON.stringify(this.user.jobs))
      .subscribe((data: Job[]) => {
        this.jobs = data;
        this.active=true;
      })
    }

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

  deleteApplication(jobId, userId){
    console.log(userId)
    console.log(jobId)
    if (this.jobservice.deleteApplicant(jobId, userId)) {
      this.messageService.showMessage('Deleted');
      this.getJobs();
    } else {
      this.messageService.showError('Something went wrong');
    };
  }

  copyText(str){
    /* Get the text field */
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    this.messageService.showMessage('Copied to clipboard');
    document.body.removeChild(el);
  }

  getApplicants(){
    
  }

  openDialog(coverString, coverName): void {
    const dialogRef = this.dialog.open(CoverDialogComponent, {
      width: '600px',
      data: {cover: coverString, name: coverName},
    });

  }

}

@Component({
  selector: 'app-cover-dialog',
  templateUrl: './cover-dialog.component.html',
})
export class CoverDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CoverDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    console.log()
    this.dialogRef.close();
  }
}
