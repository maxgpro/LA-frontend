import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHttp } from '../models/responseHttp';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  
  constructor(private http: HttpClient) {}

  getUnits() : Observable<Unit[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/units').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
