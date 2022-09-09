import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterServService } from 'src/app/services/master-serv.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm : FormGroup;
  pattern = "^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  //pattern = "^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$";
  constructor(private route:Router,private serv:MasterServService) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(this.pattern)]),
    });
  }
  

  get username() {
    return this.LoginForm.get('username');
  }
  get password() {
    return this.LoginForm.get('password');
  }

  Submit() {
    var Data = {
      Username: this.LoginForm.value.username,
      Password: this.LoginForm.value.password,
    };
    this.serv.login(Data).subscribe((res:any) => {
    })
    this.route.navigate(['/dashbord']);
    localStorage.setItem('token', '12345');
    this.serv.isLogedIn.next(true);
  }
}
