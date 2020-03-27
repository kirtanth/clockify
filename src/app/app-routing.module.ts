import { TimesheetComponent } from './timesheet/timesheet.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'


const routes: Routes = [
  {
    path: 'login' ,component:LoginComponent
  },
  {
    path: 'timesheet' ,component:TimesheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
