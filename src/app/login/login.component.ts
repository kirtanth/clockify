import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm :FormGroup = new FormGroup({
    email: new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required)
  })
  constructor(private _router:Router, private _user:UserService) { }

  ngOnInit(): void {
  }
  abc = false;
  // Redirect to Reg form
  moveToRegister(){
    this._router.navigate(['/register'])
  }
  //Btn login click event
  login(){
    //if req is not valid
    if(!this.loginForm.valid){
      console.log('Login Details invalid');
      return;
    }
    //call login fun from user service
    //console.log(JSON.stringify(this.loginForm.value));
    this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/timesheet']); this.abc =true} ,
      error=>console.error(error),
      
    )
  }


}