import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  uri = 'http://localhost:8080/users';

  constructor(
    private http: Http,
    public jwtHelper: JwtHelperService
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

  getUser(){
    console.log(JSON.stringify(this.user));
  }

  addJob(jobId, userId){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    if (jobId) {
      return this
      .http
      .post(`${this.uri}/add/${userId}`, jobId)
    } else {
      console.log('Invalid Job ID sent to auth.service');
    }
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
    }
  }
}

