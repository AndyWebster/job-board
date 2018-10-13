import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/message.service';
import { url } from '../url';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  job: any;
  urlId :String;
  // TODO, remove local host for development server calls
  uri = `${url}/joblists`;

  constructor(
    private http: HttpClient,
    public messageService: MessageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    ) { 
  }

  apply(jobId, application) {
    return this.http.post(`${this.uri}/apply/${jobId}`, application)
  }

/*   onUserUpload(fileInfo) {
    let jobId = this.JobId();
    let userId = this.authService.UserId();
    return this.http.post(`${this.uri}/apply/:${jobId}`, userId, fileInfo)
  } */

  JobId() {
    this.route.params.subscribe(params => {
      return params['id']
    });
  }

  getJobs(keywords?) {
    if(keywords){
      this.urlId = "";
      var i;
      for (i = 0; i < keywords.length; i++) {
        let id = String(keywords[i]);
        if(i) {
          var res = this.urlId.concat("&", id);
        } else {
          var res = this.urlId.concat(id);
        }
        this.urlId = res;
      }

      return this.http.get(`${this.uri}/search/${this.urlId}`)

    } else {
      return this.http.get(`${this.uri}`)
    }
  }

  findJobs(jobs) {
    var jobList = JSON.parse(jobs);
    this.urlId = "";
    var i;
    for (i = 0; i < jobList.length; i++) {
      let id = String(jobList[i]);
      if(i) {
        var res = this.urlId.concat("&", id);
      } else {
        var res = this.urlId.concat(id);
      }
      this.urlId = res;
    }
    return this.http.get(`${this.uri}/find/${this.urlId}`)
  }

  postJob(job) {
    this.job = job;
    return this
    .http
    .post(`${this.uri}/add`, job)
    .subscribe(
      res => { 
        this.authService.getProfile()
        .subscribe(
          profile => {
            this.authService.addJob(res, profile.user._id)
            .subscribe(
              res => {
                return res;
              },
              err => {
                return err;
              },
            )
          },
          err => {
          return err;
        })
      },
      err => {
        return err;
      },
    )
  }

  editJob(id) {
    return this
    .http
    .get(`${this.uri}/edit/${id}`)
  }

  updateJob(job, id){
    return this
    .http
    .post(`${this.uri}/update/${id}`, job)
  }

  deleteJob(job) {
    this.job = job;
    return this
    .http
    .delete(`${this.uri}/remove/${job}`, job)
    .subscribe(
      res => { 
        this.authService.getProfile()
        .subscribe(
          profile => {
            this.authService.removeJob(res, profile.user._id)
            .subscribe(
              res => {
                return res;
              },
              err => {
                return err;
              },
            )
          },
          err => {
          return err;
        })
      },
      err => {
        return err;
      },
    )
  }

  deleteApplicant(jobId, userId){
    
    return this.http.put(`${this.uri}/reject/${jobId}`, {"userId":userId})
    .subscribe(
      res => {
      return res;
      },
      err => {
        return err;
      },
      )
  }
}
