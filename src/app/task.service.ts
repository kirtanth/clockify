import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http:HttpClient) { }

  task(body:any){
    return this._http.post('http://127.0.0.1:3000/task/newTask',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  showTask(){
    return this._http.get('http://127.0.0.1:3000/task/show',{
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    })

  }
}
