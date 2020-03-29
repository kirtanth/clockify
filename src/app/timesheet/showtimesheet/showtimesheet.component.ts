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

  @Input() wtime ;

  constructor(private timesheet: TimesheetComponent) {
   }
 
  ngOnInit(): void {
    
  }
  a = this.wtime
  b = "12:59:59"
 thours = moment(moment(this.a,"HH:mm:ss").diff(moment(this.b,"HH:mm:ss"))).format("HH:mm:ss");
  //moment.utc(moment(this.endtime,"HH:mm:ss").diff(moment(this.starttime,"HH:mm:ss"))).format("HH:mm:ss");
  
  
  


}
