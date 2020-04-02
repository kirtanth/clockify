import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit, EventEmitter, Output, NgModule, Injectable } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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


  //Initialization-------------------------------------
  timeLeft: number = 0;
  timeLeftmm: number = 0;
  timeLefthh: number = 0;
  a: number; b: number; c: number;
  interval;
  buttona = true;
  starttime: string
  time
  endtime
  totaltime
  //Initialization----------------------------------


  getwork() {

  }

  //Taking Username
  username: String = '';

  //Constructor-----------------------------------------------------------
  constructor(private _user: UserService, private _router: Router) {
    this._user.user()
      .subscribe(
        data => this.addName(data),
        error => this._router.navigate(['/login'])
      )
  }


  //Adding Name
  addName(data) {
    this.username = data.username;
  }

  ngOnInit() {


  }



  @Output() RecordTime = new EventEmitter()

  startTimer() {
    this.buttona = false;
    //Getting user start time
    this.starttime = moment().format("HH:mm:ss");
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
    this.projectForm.patchValue({
      p_startTime: this.starttime,
      p_endTime: this.endtime,
      P_sessionTime:this.totaltime
    });
    this.p_form()

  }
  // STOP Timer End---------------------------------------------------------------

  thours

  // PROJECT DROPDOWN------------------------------------------
  projects: project[] = [
    { value: 'project-0', viewValue: 'Project-1' },
    { value: 'Project-2', viewValue: 'Project-2' },
    { value: 'Project-3', viewValue: 'Project-3' }
  ];

  // ProjectForm FormGroup-------------------------------

  projectForm: FormGroup = new FormGroup({

    p_name: new FormControl(null),
    p_title: new FormControl(null, Validators.required),
    p_startTime: new FormControl(),
    p_endTime: new FormControl(this.endtime),
    P_sessionTime: new FormControl(this.totaltime)
  })




  p_form() {
    console.log(this.projectForm.value)
  }



}
