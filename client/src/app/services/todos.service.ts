import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodosService {
  subjectTasks = new Subject();

  constructor(private http: HttpClient) { }

  public getAllTasks(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/tasks');
  }

  public getSingleTask(taskId): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/tasks/${taskId}`);
  }

  public addTask(data): Observable<any> {
    return this.http.post<any>('http://localhost:3000/tasks', data);
  }

  public deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/tasks/${taskId}`);
  }

  public editTask(taskId: number, data): Observable<any> {
    return this.http.patch<any>(`http://localhost:3000/tasks/${taskId}`, data);
  }

}
