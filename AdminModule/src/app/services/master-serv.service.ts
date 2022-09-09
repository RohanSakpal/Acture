import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterServService {
  isLogedIn = new Subject();
  userId = new Subject();
  readonly BaseURL = 'http://localhost:5000';

  constructor(private http:HttpClient) { }

  login(body:any) {
    return this.http.post(this.BaseURL+'/admins/login',body);
  }
  reset(body:any) {
    return this.http.post(this.BaseURL+'/admins/resetpassword',body);
  }
  getUserProfile() {
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.get(this.BaseURL+'/user-profile',{headers: tokenHeader});
  }
  create(body:any) {
    return this.http.post(this.BaseURL+'/admins/createuser',body);
  }
}
