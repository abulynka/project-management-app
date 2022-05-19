import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Board, Column, Task } from '../../models/boards.model';

@Injectable({
  providedIn: 'root',
})
export class SearchTaskService {
  private searchResult$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    [],
  );

  public constructor(private router: Router) {}

  public searchByValue(searchValue: string, boards: Board[]): void {
    if (!searchValue) return;

    const tasks: Task[] = [];

    boards.forEach((board: Board) => {
      board.columns.forEach((column: Column) => {
        const matchedTasks: Task[] = column.tasks
          .filter(({ title, order, description, userName }: Task) => {
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
          })
          .map((partialTask: Omit<Task, 'columnId' & 'boardId'>) =>
            this.addInfoToTask(partialTask, board.id, column.id),
          );
        tasks.push(...matchedTasks);
      });
    });

    this.searchResult$.next(tasks);
    this.router.navigate(['search-result']).then();
  }

  public getResult(): Subject<Task[] | []> {
    return this.searchResult$;
  }

  private addInfoToTask(
    task: Omit<Task, 'columnId' & 'boardId'>,
    boardId: string,
    columnId: string,
  ): Task {
    return { ...task, boardId, columnId };
  }
}
