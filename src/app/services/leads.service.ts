import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Analytic } from '../models/analytic';
import { Lead } from '../models/lead';
import { ResponseHttp } from '../models/responseHttp';
import { ResponseHttpLead } from '../models/responseHttpLead';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(private http: HttpClient) { }

  getLeads() : Observable<{
    new    : Lead[],
    process: Lead[],
    done   : Lead[]
  }> {
    return this.http.get<ResponseHttpLead>(environment.apiUrl + 'api/admin/leads').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getArchiveLeads(page: number) : Observable<Lead[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/leads/archive/index' + "?page=" + page).pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  storeLead(lead: Lead) : Observable<Lead> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/leads', lead).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  updateLead(lead: Lead) : Observable<Lead> {
    return this.http.put<ResponseHttp>(environment.apiUrl + 'api/admin/leads/'+lead.id, lead).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  checkLead(lead: Lead) : Observable<{exist:boolean, item : Lead}> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/leads/create/check', lead).pipe(
      map((data) => {
        return {
          exist:data.data.exist, 
          item : data.data.item
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  addSaleCount() : Observable<number> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/leads/addSale/count').pipe(
      map((data) => {
        return data.data.number
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  addQuality(lead: Lead)  : Observable<Lead> {
    return this.http.put<ResponseHttp>(environment.apiUrl + 'api/admin/leads/update/quality/' + lead.id, lead).pipe(
      map((data) => {
        return data.data.item;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getAnalytics(dateStart: string, dateEnd: string)  : Observable<Analytic[]> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/analytics', {
      dateStart: dateStart,
      dateEnd: dateEnd
    }).pipe(
      map((data) => {
        return data.data.items;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

}
