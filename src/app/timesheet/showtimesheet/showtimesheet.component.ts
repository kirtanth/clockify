import { UserService } from './../../user.service';
import { Showtime } from './../../showtime.model';
import { Component, OnInit, Input } from '@angular/core';
import { TimesheetComponent } from '../timesheet.component';
import { } from '../timesheet.component'
import * as moment from 'moment';
import { TaskService } from 'src/app/task.service';
import { JsonPipe } from '@angular/common';

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
//------------------------------------- Constructor START---------------------------------------------------//
  constructor(private timesheet: TimesheetComponent, private _taskService:TaskService, private _user:UserService) {

    this._taskService.showTask()
    .subscribe(
      data=>this.taskInfo(data),
      error=>console.log(error)
    )
    this._user.showTasks()
    .subscribe(
      data=>this.getTasks(data),
      error=>console.log(error)
    )
   }

//------------------------------------- Constructor ENDS---------------------------------------------------//


   getTask
   getTasks(data){
    this.getTask = data
    JSON.stringify(this.getTask)
    console.log(data)
   }

   PSessionTime
   taskInfo(data){
    this.PSessionTime = data
    JSON.stringify(this.PSessionTime)
   }
 
  ngOnInit(): void {
    
  }


  
 // a = this.wtime
 // b = "12:59:59"
 //thours = moment(moment(this.a,"HH:mm:ss").diff(moment(this.b,"HH:mm:ss"))).format("HH:mm:ss");
  //moment.utc(moment(this.endtime,"HH:mm:ss").diff(moment(this.starttime,"HH:mm:ss"))).format("HH:mm:ss");

}
