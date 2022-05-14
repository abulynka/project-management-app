import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { ColumnService } from '../../services/column.service';
import { Board, Column, Task } from '../../models/boards.model';
import { BoardsService } from '../../services/boards.service';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public board: Board = {} as Board;

  public columnList$: BehaviorSubject<[] | Column[]> | null = null;

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private taskService: TaskService,
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const boardId: string = params?.id;
      if (boardId) {
        this.boardsService
          .getBoardById(boardId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((board: Board) => {
            this.board = board;
            this.initColumnListStateObserver();
          });
      }
    });
  }

  public onAddColumn(title: string = 'default'): void {
    this.columnService.add(title);
  }

  public dropColumn(event: CdkDragDrop<any[]>): void {
    console.log({ event });
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.columnService.updateOrder(
        this.board.columns,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public addNewTaskInColumn(event: Task['title'], columnId: Column['id']) {
    const newTask = this.taskService.create(event);
    this.columnService.addTask(newTask, columnId);
  }

  private initColumnListStateObserver(): void {
    this.columnList$ = this.columnService.setState(this.board.columns);
    this.columnList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((columns: Column[]) => {
        this.board.columns = columns;
      });
  }
}
