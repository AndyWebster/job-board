import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import { url } from '../url';
import { Observable } from 'rxjs';
import { User } from '../user'

export interface Response {
  success: boolean;
  msg: string;
  token: any;
  user: {
    id: string,
    name: string,
    username: string,
    email: string,
  }
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: User;
  UserId: String;
  // TODO, remove local host for development server calls
  uri = `${url}/users`;

  
  constructor(

    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService,
    public messageService: MessageService
    
    ) { }

  registerUser(user): Observable<Response>{
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.httpClient.post<Response>(`${this.uri}/register`, user);
  }

  authenticateUser(user): Observable<Response>{
    return this.httpClient.post<Response>(`${this.uri}/authenticate`, user);
  }

  getProfile(): Observable<User>{
    let headers = new HttpHeaders();
    this.LoadToken();
    headers = headers.set('Authorization', this.authToken);
    return this.httpClient.get<User>(`${this.uri}/profile`, {headers: headers});
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  LoadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    this.LoadToken()
    if(this.authToken){
      return this.jwtHelper.isTokenExpired(this.authToken);
    } else {
      return true
    }
    
    
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  
  jobType(application){
    if(application){
      return 'apply';
    } else {
      return 'add';
    }
  }

  addJob(jobId, userId, application?){
    const jobType = this.jobType(application);

    if (jobId) {
      return this
      .httpClient
      .post(`${this.uri}/${jobType}/${userId}`, jobId)
    } else {
      console.log('Invalid Job ID sent to auth.service');
      // TODO better error handler
    }
  }

  addApplication(jobId, userId){
    const application = true;
    return this.addJob(jobId, userId, application)
  }

  onUserUpload(fileInfo) {
    
    this.getProfile()
    .subscribe(
      data => {
      this.UserId = data["user"]._id; 
      this.httpClient.post(`${this.uri}/upload/${this.UserId}`, fileInfo)
      .subscribe(
        res => {  }
        /* success => { this.messageService.showMessage('File uploaded successfully')}, 
        err => { this.messageService.showError('Something went wrong')} */
      )
    });   
    
  }      

  deleteFile(userId){
    return this.httpClient.delete(`${this.uri}/erase/${userId}`)
  }

  removeJob(jobId, userId){
    
    if (jobId) {
      return this
      .httpClient
      .post(`${this.uri}/remove/${userId}`, jobId)
    } else {
      console.log('Invalid Job ID sent to auth.service');
      // TODO better error handler
    }
  }

  
}

