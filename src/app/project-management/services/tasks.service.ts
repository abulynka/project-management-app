import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TaskResponse,
  NewTask,
  TaskByIdResponse,
  UpdateTask,
} from '../models/boards.model';
import { apiRoot } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public constructor(public http: HttpClient) {}

  public getAllTasks(
    boardId: string,
    columnId: string,
  ): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(
      `${apiRoot}/boards/${boardId}/columns/${columnId}/tasks`,
    );
  }

  public createTask(
    boardId: string,
    columnId: string,
    taskInfo: NewTask,
  ): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(
      `${apiRoot}/boards/${boardId}/columns/${columnId}/tasks`,
      taskInfo,
    );
  }

  public getTaskById(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<TaskByIdResponse> {
    return this.http.get<TaskByIdResponse>(
      `${apiRoot}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    );
  }

  public deleteTask(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<TaskResponse> {
    return this.http.delete<TaskResponse>(
      `${apiRoot}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    );
  }

  public updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    taskInfo: UpdateTask,
  ): Observable<TaskByIdResponse> {
    return this.http.put<TaskByIdResponse>(
      `${apiRoot}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      taskInfo,
    );
  }
}
