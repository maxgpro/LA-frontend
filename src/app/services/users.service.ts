import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHttp } from '../models/responseHttp';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}
  
  getUsers() : Observable<User[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/users').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
