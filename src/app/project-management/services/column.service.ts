import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../components/task-column/task-column.component';

export interface TaskColumn {
  id: string;
  order: number;
  title: string;
  tasks: Task[] | [];
}

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private columnList: TaskColumn[] | [] = [];

  private columnList$: BehaviorSubject<[] | TaskColumn[]> = new BehaviorSubject(
    this.columnList,
  );

  public getState(): BehaviorSubject<[] | TaskColumn[]> {
    return this.columnList$;
  }

  public setState(columns: TaskColumn[]): BehaviorSubject<[] | TaskColumn[]> {
    this.columnList = columns;
    this.columnList$.next(this.columnList);
    return this.columnList$;
  }

  public add(title: string): void {
    this.columnList$.next(this.pushNewItem(this.newColumn(title)));
  }

  public updateOrder(
    list: TaskColumn[],
    prevIdx: number,
    curIdx: number,
  ): void {
    list[curIdx].order = curIdx + 1;
    list[prevIdx].order = prevIdx + 1;

    this.columnList = list;
    this.columnList$.next(list);
  }

  private newColumn(title: string): TaskColumn {
    return {
      id: String(this.columnList.length + 1),
      title,
      order: this.columnList.length + 1,
      tasks: [],
    };
  }

  private pushNewItem(item: TaskColumn): TaskColumn[] {
    return (this.columnList = [...this.columnList, item]);
  }
}
