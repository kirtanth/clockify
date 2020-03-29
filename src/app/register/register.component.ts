import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm :FormGroup = new FormGroup ({
    email: new FormControl(null,[Validators.email,Validators.required]),
    username: new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required),
    cpass: new FormControl(null,Validators.required)
  })
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value)){
      console.log('Invalid Form');
      return;
    }
    console.log(JSON.stringify(this.registerForm.value));
  }

  moveToLogin(){
    this._router.navigate(['./login'])
  }

}
