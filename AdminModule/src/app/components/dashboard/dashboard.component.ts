import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterServService } from 'src/app/services/master-serv.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
userList:any[] = [
  {
    "userId":"1",
    "userName":"Rohan"
  },
  {
    "userId":"2",
    "userName":"Rohit"
  },
  {
    "userId":"3",
    "userName":"Rahul"
  },
  {
    "userId":"4",
    "userName":"Yash"
  },
  {
    "userId":"5",
    "userName":"Vinayak"
  },
  {
    "userId":"6",
    "userName":"Hemanshu"
  }
];

temp = this.userList;
  constructor(private serv:MasterServService,private route:Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.serv.getUserProfile().subscribe((res:any)=> {

    })
  }

  onSearchName(event) {
    let search = event.toLowerCase();
    this.userList = [];
    if(search.length) {
      this.temp.filter(it => {
        if (it.userName.toLowerCase().indexOf(search) >= 0) {
          this.userList.push(it);
        }
      });
    }
    else {
      this.userList = this.temp;
    }
  }

  reset(userId) {
    this.route.navigate(['/reset']);
    this.serv.userId.next(userId);
  }
}
