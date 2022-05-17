import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Column, ColumnResponse, NewTask, Task } from '../models/boards.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private columnList: ColumnResponse[] = [];

  private tasks: Task[] = [];

  private columnList$: BehaviorSubject<ColumnResponse[]> = new BehaviorSubject(
    this.columnList,
  );

  public getState(): BehaviorSubject<ColumnResponse[]> {
    return this.columnList$;
  }

  public setState(
    columns: ColumnResponse[],
  ): BehaviorSubject<ColumnResponse[]> {
    this.columnList = columns;
    this.columnList$.next(this.columnList);
    return this.columnList$;
  }

  public add(column: ColumnResponse): void {
    this.columnList$.next(this.pushNewItem(column));
  }

  public updateOrder(
    list: ColumnResponse[],
    prevIdx: number,
    curIdx: number,
  ): ColumnResponse[] {
    list[curIdx].order = curIdx + 1;
    list[prevIdx].order = prevIdx + 1;

    const updateOrders: ColumnResponse[] = [list[curIdx], list[prevIdx]];

    let index: number = Math.min(curIdx, prevIdx);
    for (let i: number = index; i < list.length; ++i) {
      if (list[i].order !== i + 1) {
        list[i].order = i + 1;
        updateOrders.push(list[i]);
      }
    }

    this.columnList = list;
    this.columnList$.next(list);

    return updateOrders;
  }

  public newTask(newTask: NewTask): NewTask {
    return {
      ...newTask,
      order: Math.max(...this.tasks.map((task: NewTask) => task.order), 0) + 1,
    };
  }

  public addTask(task: Task): void {
    this.tasks.push(task);

    // const columnIndex: number = this.columnList.findIndex(
    //   (column: ColumnResponse) => column.id === task.columnId,
    // );
    // const selectedColumn: ColumnResponse = this.columnList[columnIndex];
    // selectedColumn.tasks = [...selectedColumn.tasks, task];

    this.columnList$.next(this.columnList);
  }

  public newColumn(title: string): Column {
    return {
      id: '',
      title,
      order:
        Math.max(
          ...this.columnList.map((column: ColumnResponse) => column.order),
          0,
        ) + 1,
      tasks: [],
    };
  }

  private pushNewItem(item: ColumnResponse): ColumnResponse[] {
    return (this.columnList = [...this.columnList, item]);
  }
}
