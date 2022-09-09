import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterServService } from 'src/app/services/master-serv.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  ResetForm : FormGroup;
  // pattern = "^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  pattern = "^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$";
  userId = "";
  confPasswordMatch = false;
  popupMsg = "";
  constructor(private route:Router,private serv:MasterServService) { }

  ngOnInit(): void {
    this.ResetForm = new FormGroup({
      userid: new FormControl('',Validators.required),
      newpassword: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(this.pattern)]),
      confirmpassword: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(this.pattern)]),
    });

    this.serv.userId.subscribe((res:any)=> {
      this.userId = res;
      this.ResetForm['controls']['userid'].setValue(res);
    })
  }

  get userid() {
    return this.ResetForm.get('userid');
  }
  get newpassword() {
    return this.ResetForm.get('newpassword');
  }
  get confirmpassword() {
    return this.ResetForm.get('confirmpassword');
  }

  Submit() {
    debugger
    if(this.ResetForm.value.confirmpassword === this.ResetForm.value.newpassword) {
      var body = {
        UserId: this.ResetForm.value.userid,
        newPassword: this.ResetForm.value.newpassword,
        confirmPassword: this.ResetForm.value.confirmpassword,
      };
      this.serv.reset(body).subscribe((res:any)=>{
        console.log(res);
        if(res.statusCode == 200) {
          this.ResetForm.reset();
          this.popupMsg = res.message;
          this.confPasswordMatch = true;
            setTimeout(()=>{ 
              this.confPasswordMatch = false;
            }, 3000);
          }
      })
    } else {
      this.popupMsg = "Confirm Password does not match to Password";
      this.confPasswordMatch = true;
      setTimeout(()=>{ 
        this.confPasswordMatch = false;
      }, 3000);
    }
  }
  cancleForm() {
    this.ResetForm.reset();
  }

}
