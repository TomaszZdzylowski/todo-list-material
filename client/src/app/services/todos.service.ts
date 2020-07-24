import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  subjectTasks = new Subject();
  tasksUrl: string = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  public getAllTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${this.tasksUrl}`);
  }

  public getSingleTask(taskId): Observable<Task> {
    return this.http.get<Task>(`${this.tasksUrl}/${taskId}`);
  }

  public addTask(data): Observable<Task> {
    return this.http.post<Task>(`${this.tasksUrl}`, data);
  }

  public deleteTask(taskId: number): Observable<Task> {
    return this.http.delete<Task>(`${this.tasksUrl}/${taskId}`);
  }

  public editTask(taskId: number, data): Observable<Task> {
    return this.http.patch<Task>(`${this.tasksUrl}/${taskId}`, data);
  }

}
