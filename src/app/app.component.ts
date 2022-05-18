import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { SignUpResponse } from './auth/models/authorization.model';
import { LangService } from './core/services/lang.service';
import { Board, Column, Task } from './project-management/models/boards.model';
import { BoardsService } from './project-management/services/boards.service';
import { SearchTaskService } from './project-management/services/search-task/search-task.service';
import { UserService } from './project-management/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private users: SignUpResponse[] = [];

  private fullBoards: Board[] = [];

  public constructor(
    private langService: LangService,
    private searchTaskService: SearchTaskService,
    private userService: UserService,
    private boardsService: BoardsService,
  ) {}

  public ngOnInit(): void {
    this.initSetDefaultLanguage();

    this.initUsersObserver();
    this.genFullBoardsObserver();
  }

  public onSearch(value: string): void {
    this.searchTaskService.searchByValue(value, this.fullBoards);
  }

  private initSetDefaultLanguage(): void {
    this.langService.setLang(environment.defaultLocale);
  }

  private initUsersObserver(): void {
    this.userService
      .getUsers()
      .subscribe((users: SignUpResponse[]) => (this.users = users));
  }

  private setUserNamesInTasks(boards: Board[]): void {
    this.fullBoards = boards.map((board: Board) => {
      const updatedColumns: Board['columns'] = board.columns.map(
        (column: Column) => {
          const updatedTasks: Column['tasks'] = column.tasks.map(
            (task: Task) => {
              const user: SignUpResponse | undefined = this.users.find(
                (userData: SignUpResponse) => task.userId === userData.id,
              );
              return { ...task, userName: user?.name };
            },
          );
          return { ...column, tasks: updatedTasks };
        },
      );
      return { ...board, columns: updatedColumns };
    });
  }

  private genFullBoardsObserver(): void {
    this.boardsService.getFullBoards().subscribe((boards: Board[]) => {
      this.setUserNamesInTasks(boards);
    });
  }
}
