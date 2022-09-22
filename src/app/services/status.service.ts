import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseHttp } from '../models/responseHttp';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatuses() : Observable<Status[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/statuses').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
}
