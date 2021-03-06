import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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

  JobId() {
    this.route.params.subscribe(params => {
      return params['id']
    });
  }

  getJobs() {
    return this.http.get(`${this.uri}`)
  }

  searchJobs(keywords){
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

  findApplyJobs(jobs) {
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
    return this.http.get(`${this.uri}/find-apply/${this.urlId}`)
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
          data => {
            this.authService.addJob(res, data['user']._id)
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
          data => {
            this.authService.removeJob(res, data['user']._id)
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
