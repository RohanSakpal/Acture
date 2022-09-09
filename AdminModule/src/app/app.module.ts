import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ResetComponent } from './components/reset/reset.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateUserComponent } from './components/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetComponent,
    NavbarComponent,
    DashboardComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
