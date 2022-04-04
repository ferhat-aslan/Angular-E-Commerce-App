import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login<T>():Observable<T>{
    return this.http.get<T>("https://patika-server-app.herokuapp.com/users").pipe();

  }
  registerUser<T>(req:any):Observable<T>{
    return this.http.post<T>("https://patika-server-app.herokuapp.com/users",req).pipe();
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  isLogged(){
    if(localStorage.getItem('access_token')){return true;}

    return false;
  }
}
