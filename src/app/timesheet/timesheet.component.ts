import { Component, OnInit, EventEmitter, Output, NgModule, Injectable } from '@angular/core';
import { format } from 'path';
import * as moment from 'moment';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class TimesheetComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }


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

 
 

  // STOP TIMER CODE
  pauseTimer() {
    this.buttona = true;
    //Getting User Stop Time
   this.endtime = moment().format("HH:mm:ss");

  this.totaltime = moment.utc(moment(this.endtime,"HH:mm:ss").diff(moment(this.starttime,"HH:mm:ss"))).format("HH:mm:ss");
    console.log(this.totaltime)

    this.a = this.timeLeft;
    this.b = this.timeLeftmm
    this.c = this.timeLefthh;
    this.timeLefthh = 0;
    this.timeLeft = 0;
    this.timeLeftmm = 0;
    clearInterval(this.interval);
    this.time = 'You Worked For :'+this.c + ':' + this.b + ':' + this.a +' Hours'
    console.log(this.z)
  }
  m = moment()
  z = moment(this.endtime).subtract(8,"h")
  totaltime
  thours

  

}
