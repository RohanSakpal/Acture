import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterServService } from 'src/app/services/master-serv.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  CreateForm : FormGroup;
  pattern = "^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  confPasswordMatch = false;
  popupMsg = "";
  constructor(private route:Router,private serv:MasterServService) { }

  ngOnInit(): void {
    this.CreateForm = new FormGroup({
      name: new FormControl('',Validators.required),
      surname: new FormControl('',Validators.required),
      role: new FormControl('',Validators.required),
      username: new FormControl('',Validators.required),
      temppassword: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(this.pattern)]),
      confirmpassword: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(this.pattern)]),
      usertype: new FormControl('',Validators.required),
    });
  }

  get name() {
    return this.CreateForm.get('name');
  }
  get surname() {
    return this.CreateForm.get('surname');
  }
  get role() {
    return this.CreateForm.get('role');
  }
  get username() {
    return this.CreateForm.get('username');
  }
  get temppassword() {
    return this.CreateForm.get('temppassword');
  }
  get confirmpassword() {
    return this.CreateForm.get('confirmpassword');
  }
  get usertype() {
    return this.CreateForm.get('usertype');
  }
  

  Submit() {
    debugger
    if(this.CreateForm.value.temppassword == this.CreateForm.value.confirmpassword) {
      var Data = {
        GivenName: this.CreateForm.value.name,
        Surname: this.CreateForm.value.surname,
        Role: this.CreateForm.value.role,
        UserName: this.CreateForm.value.username,
        TempPassword: this.CreateForm.value.temppassword,
        ConfirmPassword: this.CreateForm.value.confirmpassword,
        UserType: this.CreateForm.value.usertype
      };
      this.serv.create(Data).subscribe((res:any) => {
        if(res.statusCode == 200) {
          this.popupMsg = res.message;
          this.confPasswordMatch = true;
          setTimeout(()=>{ 
            this.confPasswordMatch = false;
          }, 3000);
          //this.route.navigate(['/dashbord']);
        }
      });
      //this.popupMsg = "user create successfully!";
    } else {
      this.confPasswordMatch = true;
      this.popupMsg = "Confirm Password does not match to Temp Password";
      setTimeout(()=>{ 
        this.confPasswordMatch = false;
      }, 3000);
    }
  }

}
