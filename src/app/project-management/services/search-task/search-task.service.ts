import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Board, Column, Task } from '../../models/boards.model';

@Injectable({
  providedIn: 'root',
})
export class SearchTaskService {
  public constructor(private router: Router) { }

  private searchResult$: Subject<Task[] | []> = new Subject();

  public searchByValue(searchValue: string, boards: Board[]): void {
    if (!searchValue) return;
    
    const tasks: Task[] = [];

    boards.forEach((board: Board) => {
      board.columns.forEach((column: Column) => {
        const matchedTasks: Task[] = column.tasks.filter(
          ({ title, order, description, userName }: Task) => {
            const valuesFields: string[] = [
              title,
              String(order),
              description,
              String(userName),
            ];

            const findedValue: string | undefined = valuesFields.find(
              (itemValue: string) => {
                return itemValue.includes(searchValue);
              },
            );

            if (findedValue) {
              return true;
            }

            return false;
          },
        );
        // TODO: save boardId and columnId in matchedTasks
        // TODO: openTask() => openBoard() => findTaksInColumn and scroll to column, then hover findedTask
        tasks.push(...matchedTasks);
      });
    });

    console.log({ tasks });
    this.searchResult$.next(tasks);
    this.router.navigate(['search-result']).then();
  }

  public getResult(): Subject<Task[] | []> {
    return this.searchResult$;
  }
}
