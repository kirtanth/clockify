import { TaskService } from './../task.service';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit, EventEmitter, Output, NgModule, Injectable } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { data } from '../data';
import { error } from 'protractor';

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


  //-----------------------------------------------Initialization---Starts-------------------------------------
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
  //-------------------------------------------Initialization-- Ends----------------------------------


  getwork() {

  }

  //Taking Username
  username: String = '';
  email:string='';

  //-----------------------------------------Constructor-----------------------------------------------------------
  constructor(private _user: UserService, private _router: Router, private _taskService:TaskService) {
    
    //subscribe user
    this._user.user()
      .subscribe(
        data => this.addName(data),
        error => this._router.navigate(['/login'])
      )
  }


  //Adding Name
  addName(data) {
    this.username = data.username;
    this.email = data.email
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
      pEmail: this.email,
      pStartTime: this.starttime,
      pEndTime: this.endtime,
      PSessionTime:this.totaltime
    });
  
    this.pForm()
    this.addTask()
    this.tasks()

  }
  // STOP Timer End---------------------------------------------------------------

  thours

  // PROJECT DROPDOWN------------------------------------------
  projects: project[] = [
    { value: 'project-1', viewValue: 'Project-1' },
    { value: 'Project-2', viewValue: 'Project-2' },
    { value: 'Project-3', viewValue: 'Project-3' }
  ];

  // ProjectForm FormGroup-------------------------------

  projectForm: FormGroup = new FormGroup({

    pName: new FormControl(null),
    pTitle: new FormControl(null, Validators.required),
    pEmail: new FormControl(),
    pStartTime: new FormControl(),
    pEndTime: new FormControl(this.endtime),
    PSessionTime: new FormControl(this.totaltime)
  })

  addTask(){
    this._taskService.task(JSON.stringify(this.projectForm.value))
    .subscribe(
      data=> console.log(data),
      error=> console.log(error)
    )
  }

  pForm() {
    
    console.log(JSON.stringify(this.projectForm.value))
   
  }

  //Fun for Subscribe Task
  tasks(){
    this._user.tasks(JSON.stringify(this.projectForm.value))
    .subscribe(
      data=> console.log(data),
      error=>console.log(error)
    )
  }



}
