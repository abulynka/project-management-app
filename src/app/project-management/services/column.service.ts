import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Column } from '../models/boards.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private columnList: Column[] | [] = [];

  private columnList$: BehaviorSubject<[] | Column[]> = new BehaviorSubject(
    this.columnList,
  );

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
      tasks: [],
    };
  }

  private pushNewItem(item: Column): Column[] {
    return (this.columnList = [...this.columnList, item]);
  }
}
