import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Column, ColumnResponse, Task } from '../models/boards.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private columnList: ColumnResponse[] | [] = [];

  private columnList$: BehaviorSubject<[] | ColumnResponse[]> =
    new BehaviorSubject(this.columnList);

  public getState(): BehaviorSubject<[] | ColumnResponse[]> {
    return this.columnList$;
  }

  public setState(
    columns: ColumnResponse[],
  ): BehaviorSubject<[] | ColumnResponse[]> {
    this.columnList = columns;
    this.columnList$.next(this.columnList);
    return this.columnList$;
  }

  public add(title: string): ColumnResponse {
    const column: ColumnResponse = this.newColumn(title);
    this.columnList$.next(this.pushNewItem(column));
    return column;
  }

  public updateOrder(
    list: ColumnResponse[],
    prevIdx: number,
    curIdx: number,
  ): void {
    list[curIdx].order = curIdx + 1;
    list[prevIdx].order = prevIdx + 1;

    this.columnList = list;
    this.columnList$.next(list);
  }

  public addTask(task: Task): void {
    // const columnIndex: number = this.columnList.findIndex(
    //   (column: ColumnResponse) => column.id === task.columnId,
    // );
    // const selectedColumn: ColumnResponse = this.columnList[columnIndex];
    // selectedColumn.tasks = [...selectedColumn.tasks, task];

    console.log(task);

    this.columnList$.next(this.columnList);
  }

  private newColumn(title: string): Column {
    return {
      id: String(this.columnList.length + 1),
      title,
      order: this.columnList.length + 1,
      tasks: [],
    };
  }

  private pushNewItem(item: ColumnResponse): ColumnResponse[] {
    return (this.columnList = [...this.columnList, item]);
  }
}
