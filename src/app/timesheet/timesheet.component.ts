import { Showtime } from './../showtime.model';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit, EventEmitter, Output, NgModule, Injectable } from '@angular/core';
import { format } from 'path';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';




interface project {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class TimesheetComponent implements OnInit {

  getwork(){
    
  }
  
  projectForm : FormGroup = new FormGroup({
    projectName: new FormControl(null,Validators.required)
  })

addToTask(){
  console.log(this.projectForm.value.projectName)
}
//Taking Username
  username:String='';

  //Constructor-----------------------------------------------------------
  constructor(private _user: UserService, private _router: Router) {
    this._user.user()
      .subscribe(
        data => this.addName(data),
        error => this._router.navigate(['/login'])
      )
  }


  //Adding Name
  addName(data){
    this.username = data.username;
  }

  ngOnInit(): void {
  }

  //Timer Code
  timeLeft: number = 0;
  timeLeftmm: number = 0;
  timeLefthh: number = 0;
  a: number; b: number; c: number;
  interval;
  buttona = true;
  starttime
  time
  endtime

  @Output() RecordTime = new EventEmitter()

  startTimer() {
    this.addToTask()
    this.buttona = false;
    //Getting user start time
    this.starttime = moment().format("HH:mm:ss");

    console.log('Your Starting time' + this.starttime)


    this.interval = setInterval(() => {
      if (this.timeLeft <= 60) {
        this.timeLeft++;

        if (this.timeLeft == 60) {
          this.timeLeft = 0;
          this.timeLeftmm = this.timeLeftmm + 1

          if (this.timeLeftmm == 60) {
            this.timeLeft == 0
            this.timeLeftmm = 0;
            this.timeLefthh = this.timeLefthh + 1
            if (this.timeLefthh == 24) {
              this.timeLeft = 0
              this.timeLeftmm = 0
              this.timeLefthh = 0
            }
          }
        }
      }
      else if (this.timeLeftmm < 3) {
        this.timeLefthh = 0;
        this.timeLeft = 0;
        this.timeLefthh = this.timeLefthh + 1;
      }
    }, 1000)
    this.RecordTime.emit(this.c + ':' + this.b + ':' + this.a);
  }




  // STOP TIMER CODE-----------------------------------------------------------------
  pauseTimer() {
    this.buttona = true;
    //Getting User Stop Time
    this.endtime = moment().format("HH:mm:ss");

    this.totaltime = moment.utc(moment(this.endtime, "HH:mm:ss").diff(moment(this.starttime, "HH:mm:ss"))).format("HH:mm:ss");

    this.a = this.timeLeft;
    this.b = this.timeLeftmm
    this.c = this.timeLefthh;
    this.timeLefthh = 0;
    this.timeLeft = 0;
    this.timeLeftmm = 0;
    clearInterval(this.interval);
    this.time = 'You Worked For :' + this.c + ':' + this.b + ':' + this.a + ' Hours'
    
  }
// STOP Timer End---------------------------------------------------------------
 totaltime
  thours

  // PROJECT DROPDOWN------------------------------------------
  projects: project[] = [
    {value: 'project-0', viewValue: 'Project-1'},
    {value: 'Project-2', viewValue: 'Project-2'},
    {value: 'Project-3', viewValue: 'Project-3'}
  ];
  // cs=false
  // createSelect(){
  //   this.cs=true  
  // }
  

}
