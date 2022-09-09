import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterServService } from 'src/app/services/master-serv.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showDropdown:boolean = false;
  constructor(private serv:MasterServService,private route:Router) { }

  ngOnInit(): void {
    this.serv.isLogedIn.subscribe((res:any) => {
      this.showDropdown  = res;
    });

    if(localStorage.getItem('token') != null) {
      this.showDropdown = true;
    }
  }

  changeOption(event:any) {
    if(event == 'reset') {
      this.route.navigate(['/reset']);
    } else if(event == 'logout') {
      this.route.navigate(['/']);
      localStorage.removeItem('token');
      this.serv.isLogedIn.next(false);
    }
    else if(event == 'create') {
      this.route.navigate(['/create-user']);
    }
  }

}
