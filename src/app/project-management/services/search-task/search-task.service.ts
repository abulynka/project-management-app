import { Injectable } from '@angular/core';
import { Board, Column, Task } from '../../models/boards.model';

@Injectable({
  providedIn: 'root',
})
export class SearchTaskService {
  public searchByValue(searchValue: string, boards: Board[]): void {
    const tasks: Task[] = [];
    console.log(searchValue, boards);

    boards.forEach((board: Board) => {
      board.columns.forEach((column: Column) => {
        const matchedTasks: Task[] = column.tasks.filter((task: Task) => {
          const values: string[] = Object.values(task);
          // eslint-disable-next-line @typescript-eslint/typedef
          const findedValue = values.find((itemValue: string) => {
            // eslint-disable-next-line @typescript-eslint/comma-dangle
            return itemValue.includes(searchValue);
          });

          if (findedValue) {
            return true;
          }

          return false;
        });
        console.log({ matchedTasks });
        tasks.push(...matchedTasks);
      });
    });

    console.log({ tasks });
  }
}

// поиск таска по номеру таска, названию, пользователям, которые в нём участвуют и по тексту описания задачи.
// private searchByValue = (value: string): IItem[] | [] => {
//   console.log({ value });

//   return this.data.filter((item: IItem) => {
//     const values: string[] = Object.values(item);

//     // eslint-disable-next-line @typescript-eslint/typedef
//     const findedValue = values.find((itemValue: string) => {
//       // eslint-disable-next-line @typescript-eslint/comma-dangle
//       return itemValue.includes(value);
//     });

//     if (findedValue) {
//       return true;
//     }

//     return false;
//   });
// };
