import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseHttp } from '../models/responseHttp';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Task } from '../models/task';
import { TaskComment } from '../models/taskComment';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {

  constructor(private http: HttpClient) { }
    
  getComments(id: number) : Observable<TaskComment[]> {
    return this.http.get<ResponseHttp>(environment.apiUrl + 'api/admin/tasks/' + id).pipe(
      map((data) => {
        return data.data.items
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  storeTaskComment(taskComment: TaskComment) : Observable<Task> {
    return this.http.post<ResponseHttp>(environment.apiUrl + 'api/admin/task-comments', taskComment).pipe(
      map((data) => {
        return data.data.item
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
}
