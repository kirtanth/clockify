import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { observable } from 'rxjs';

@Injectable()
export class UserService {
  // USER SERVICE START

  constructor(private _http:HttpClient) { }

  register(body:any){
    return this._http.post('http://127.0.0.1:3000/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
//-------------------------------LOGIN POST Req START----------------FOR Login User-------------------------//
  login(body:any){
    return this._http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
//-------------------------------LOGIN POST Req END---------------------------------------------------------//

//  --------------------------------TASKS PUT Req STRAT----------FOR Add TASk in User Tasks Array------------//
  tasks(body:any){
    return this._http.put('http://127.0.0.1:3000/users/newTask',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  // -----------------------------TASK PUT Req------- END ----------------------------------------------//


//------------------------------- USER GET Req------ START----------FOR Get the Current User Info--------//
  user(){
    return this._http.get('http://127.0.0.1:3000/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
//------------------------------- USER GET Req------ END-----------------------------------------------//


  // -----------------------------ShowTask GET Req-----START----FOR GET all Current User Task From Tasks Array-----//
  showTasks(){
    return this._http.get('http://127.0.0.1:3000/users/showTasks',{
      observe:'body',
      withCredentials : true,
      headers: new HttpHeaders().append('Content-Type','application/json')
    })
  }
  // -----------------------------ShowTask GET Req------END-------------------------------------------//


// --------------------------------LOGOUT GET req-------START-------------------------------------------//
  logout(){
    return this._http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }
// --------------------------------LOGOUT GET req-------START-------------------------------------------//

// -----------------------------------USER SERVICE----END--------------------------------------------------//
}