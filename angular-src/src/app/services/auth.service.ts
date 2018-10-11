import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  UserId: String;
  // TODO, remove local host for development server calls
  uri = 'http://localhost:8080/users';

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService,
    public messageService: MessageService
    ) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(`${this.uri}/register`, user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(`${this.uri}/authenticate`, user, {headers: headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.LoadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(`${this.uri}/profile`, {headers: headers})
      .map(res => res.json());
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

/*   UserId() {
    this.getProfile()
    .subscribe(
      profile => {
        console.log("1 " + profile.user._id)
        this.user = profile.user;
      } 
    )
  } */
  
  jobType(application){
    if(application){
      return 'apply';
    } else {
      return 'add';
    }
  }

  addJob(jobId, userId, application?){
    const jobType = this.jobType(application);
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    if (jobId) {
      return this
      .http
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
      profile => {
      this.UserId = profile.user._id; 
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
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    if (jobId) {
      return this
      .http
      .post(`${this.uri}/remove/${userId}`, jobId)
    } else {
      console.log('Invalid Job ID sent to auth.service');
      // TODO better error handler
    }
  }

  
}

