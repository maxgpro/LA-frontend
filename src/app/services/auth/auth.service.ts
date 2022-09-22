import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { ResponseHttpLogin } from 'src/app/models/responseHttpLogin';
import { ResponseHttpLoginDefault } from 'src/app/models/responseHttpLoginDefault';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }
  
  loginDefault(email: string, password: string) {
    return this.http.post<ResponseHttpLoginDefault>(environment.apiUrl + 'api/oauth/token', { 
      username : email, 
      password,
      client_id : environment.auth.clientId,
      client_secret : environment.auth.clientSecret,
      grant_type : "password",
      scope : ''
    } ).pipe(
      map((data)=>{
        if (data.access_token) {
          this.setUser(null);
          this.setToken(data.access_token);
          this.setRefrashToken(data.refresh_token);
          
          return true;
        }

        return null;
      }),
      catchError((error)=>{
        console.log('Error - ', error);
        return throwError(error);
      })
    );
  }
  
  setRefrashToken(refresh_token: string) {
    sessionStorage.setItem('userTokenRefrash', refresh_token);
  }

  login(email: string, password: string) {
    return this.http.post<ResponseHttpLogin>(environment.apiUrl + 'api/pub/auths/login',{
      email,
      password
    }).pipe(
      map((data)=>{
      if(data.data.user && data.data.api_token) {
        this.setUser(JSON.stringify(data.data.user));
        this.setToken(data.data.api_token);

        return data.data.user;
      }
      return null;
    })
    ,
    catchError((error) => {
      console.log(error);
      return throwError(error);
    })
    )
  }

  setToken(api_token: string) {
    sessionStorage.setItem('userToken', api_token);
  }

  getToken(): string {
    if (this.checkUser()) {
      return sessionStorage.getItem('userToken');
    }
    return '';
  }

  setUser(user: string) {
    sessionStorage.setItem('currentUser', user);
  }

  logout(): void {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('currentUser');
  }

  checkUser(): boolean {
    if(sessionStorage.getItem('userToken') && sessionStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
}
