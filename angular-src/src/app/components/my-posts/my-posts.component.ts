import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JobsService } from '../../services/jobs.service';
import { MessageService } from '../../services/message.service';
import { Job } from '../../job';
import { User } from '../../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { url } from '../../url';
import { cardFade, cardOpenClose } from '../../animations';
import { ActivatedRoute, Router } from '@angular/router';

export interface DialogData {
  cover: string;
  name: string;
}

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
  animations: [cardFade, cardOpenClose]
})
export class MyPostsComponent implements OnInit {
  user:User;
  jobs: Job[];
  displayedColumns: string[] = ['name', 'email', 'cover', 'cv', 'action'];
  applications: Object;
  active=false;
  filteredJobs: Job[];
  uri = `${url}/upload`;

  constructor(
    private authService: AuthService,
    private jobservice: JobsService,
    public messageService: MessageService,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
  ) { }

  
  ngOnInit() {
    this.getProfile();
  };

  getProfile() {
    this.authService.getProfile().subscribe(data => {
      this.user = data["user"];
      this.getJobs();
    },
    err => {
      console.log(err);
      return false;
    }
    )};

  getJobs(): void {
    if(!this.user.jobs.length){
      
      this.active=false;
    } else {
      console.log(this.user.jobs.length);
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
      this.messageService.showMessage('Job deleted');
    } else {
      this.messageService.showError('Something went wrong');
    };
    return new Promise(() => {setTimeout(() => {this.getJobs();}, 400);});
    
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

  download(filename){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    this.http.get(`${this.uri}/${filename}`, { headers: headers, responseType: 'blob' })
    .subscribe(
      response => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
            downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();

      })
  }

  getApplicants(){
    
  }


  confirmDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.deleteJob(id);

      } else {
        this.getJobs();
      }
    });
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


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
