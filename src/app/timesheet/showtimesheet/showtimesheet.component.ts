import { Showtime } from './../../showtime.model';
import { Component, OnInit, Input } from '@angular/core';
import { TimesheetComponent } from '../timesheet.component';
import { } from '../timesheet.component'
import * as moment from 'moment';

@Component({
  selector: 'app-showtimesheet',
  templateUrl: './showtimesheet.component.html',
  styleUrls: ['./showtimesheet.component.css']
})
export class ShowtimesheetComponent implements OnInit {

  @Input() wtime; @Input() etime;
  
   addWork(){ 
    this.wtime
    this.timeArray.push(this.wtime)
    this.showWork = new Showtime()
    this.showmeworkArray.push(this.showWork)

  }
  showWork = new Showtime()
  showmeworkArray = [];
  timeArray = [];

  constructor(private timesheet: TimesheetComponent) {
    this.wtime
   }
 
  ngOnInit(): void {
    
  }


  
 // a = this.wtime
 // b = "12:59:59"
 //thours = moment(moment(this.a,"HH:mm:ss").diff(moment(this.b,"HH:mm:ss"))).format("HH:mm:ss");
  //moment.utc(moment(this.endtime,"HH:mm:ss").diff(moment(this.starttime,"HH:mm:ss"))).format("HH:mm:ss");

}
