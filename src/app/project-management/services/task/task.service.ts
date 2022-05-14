import { Injectable } from '@angular/core';
import { Task } from '../../models/boards.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private newTaskDefaultData: Task = {
    id: String(Math.random()),
    title: '',
    order: 1,
    done: false,
    description: 'string',
    userId: 'userId',
    files: [],
  };

  public create(title: string): Task {
    return { ...this.newTaskDefaultData, title };
  }
}
