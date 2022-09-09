import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashbord',component:DashboardComponent},
  {path:'reset',component:ResetComponent},
  {path:'create-user',component:CreateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
