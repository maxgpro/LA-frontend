import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lead } from '../models/lead';
import { LeadComment } from '../models/leadComment';
import { ResponseHttp } from '../models/responseHttp';

@Injectable({
  providedIn: 'root'
})
export class LeadCommentService {

  constructor(private http: HttpClient) { }

  getComments(id: number) : Observable<LeadComment[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/leads/history/' + id).pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  storeLeadComment(leadComment: LeadComment) : Observable<Lead> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/lead-comments', leadComment).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

}
