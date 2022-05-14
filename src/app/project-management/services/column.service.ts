import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Column, Task } from '../models/boards.model';
import { TaskService } from './task/task.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private columnList: Column[] | [] = [];

  private columnList$: BehaviorSubject<[] | Column[]> = new BehaviorSubject(
    this.columnList,
  );

  public constructor(private taskService: TaskService) {}

  public getState(): BehaviorSubject<[] | Column[]> {
    return this.columnList$;
  }

  public setState(columns: Column[]): BehaviorSubject<[] | Column[]> {
    this.columnList = columns;
    this.columnList$.next(this.columnList);
    return this.columnList$;
  }

  public add(title: string): void {
    this.columnList$.next(this.pushNewItem(this.newColumn(title)));
  }

  public updateOrder(list: Column[], prevIdx: number, curIdx: number): void {
    list[curIdx].order = curIdx + 1;
    list[prevIdx].order = prevIdx + 1;

    this.columnList = list;
    this.columnList$.next(list);
  }

  private newColumn(title: string): Column {
    return {
      id: String(this.columnList.length + 1),
      title,
      order: this.columnList.length + 1,
      tasks: [
        {
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
          title: 'Task: pet the cat',
          order: 1,
          done: false,
          description: 'Domestic cat needs to be stroked gently',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
        {
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
          title: 'Task: pet the cat',
          order: 1,
          done: false,
          description: 'Domestic cat needs to be stroked gently',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
      ],
    };
  }

  private pushNewItem(item: Column): Column[] {
    return (this.columnList = [...this.columnList, item]);
  }

  public addTask(task: Task, columnId: Column['id']): void {
    const columnIndex = this.columnList.findIndex(
      (column) => column.id === columnId,
    );
    const selectedColumn = this.columnList[columnIndex];
    selectedColumn.tasks = [...selectedColumn.tasks, task];

    this.columnList$.next(this.columnList);
  }
}
