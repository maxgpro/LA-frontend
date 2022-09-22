import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHttp } from '../models/responseHttp';
import { ResponseHttpTask } from '../models/responseHttpTask';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  storeTask(task: Task) : Observable<Task> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/tasks', task).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getTasks() : Observable<{
    new    : Task[],
    process: Task[],
    done   : Task[]
  }> {
    return this.http.get<ResponseHttpTask>(environment.apiUrl + 'api/admin/tasks').pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getArchiveTasks(page: number) : Observable<Task[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/archive/index' + "?page=" + page).pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

}
