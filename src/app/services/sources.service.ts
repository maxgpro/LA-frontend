import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHttp } from '../models/responseHttp';
import { Source } from '../models/source';

@Injectable({
  providedIn: 'root'
})
export class SourcesService {
  
  constructor(private http: HttpClient) {}

  getSources() : Observable<Source[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/sources').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  storeSource(source: Source) : Observable<Source> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/sources', source).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updateSource(source: Source) : Observable<Source> {
    return this.http.put<ResponseHttp>(environment.apiUrl + 'api/admin/sources/' + source.id, source).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  deleteSource(source: Source): Observable<Source> {
    return this.http.delete<ResponseHttp>(environment.apiUrl + 'api/admin/sources/' + source.id ).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

}
