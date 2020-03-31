import { UserService } from './user.service';
import { AppPage } from './../../e2e/src/app.po';
import { Component, Inject } from '@angular/core';
import { FormsModule, FormControl, FormGroup, FormArray, NgForm } from '@angular/forms'
import { data } from './data';
import { strict } from 'assert';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';



export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _user:UserService , private _router: Router){}

 

  

}
