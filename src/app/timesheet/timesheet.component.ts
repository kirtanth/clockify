import { Component, OnInit, EventEmitter, Output,NgModule } from '@angular/core';
import { format } from 'path';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  timeLeft: number = 0;
  timeLeftmm: number = 0;
  timeLefthh: number = 0;
  a: number; b: number; c: number;
  interval;
  buttona = true;

 @Output() RecordTime = new EventEmitter()
  // START TIMER CODE

  startTimer() {
    this.buttona = false;
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
    this.a = this.timeLeft;
    this.b = this.timeLeftmm
    this.c = this.timeLefthh;
    this.timeLefthh = 0;
    this.timeLeft = 0;
    this.timeLeftmm = 0;
    clearInterval(this.interval);
    console.log("You worked for " + this.c + ":" + this.b + ":" + this.a)
  }


}
