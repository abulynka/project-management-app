import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { ColumnService } from '../../services/column.service';
import { BoardShort, Column, Task } from '../../models/boards.model';
import { select, Store } from '@ngrx/store';
import { BoardsState } from '../../../redux/state.models';
import { getBoardById } from '../../../redux/selectors/boards.selector';

import { TaskService } from '../../services/task/task.service';
import { ColumnsService } from '../../services/columns.service';
import { BoardsService } from '../../services/boards.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditColumnComponent } from '../../components/edit-column/edit-column.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public board: BoardShort = {} as BoardShort;

  public columns: Column[] = [];

  public title: string = '';

  public columnList$: BehaviorSubject<[] | Column[]> | null = null;

  public titleSwitch: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private store: Store<BoardsState>,
    private taskService: TaskService,
    private columnsService: ColumnsService,
    private boardsService: BoardsService,
    private dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.store
      .pipe(
        select(getBoardById(this.route.snapshot.params['id'])),
        takeUntil(this.destroy$),
      )
      .subscribe((board: BoardShort | undefined) => {
        if (board) {
          this.columnsService
            .getAllColumns(board.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((columns: any) => {
              this.columns = columns;
              this.board = board;
              this.title = this.board.title;
              this.initColumnListStateObserver();
            });
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onAddColumn(): void {
    const dialogInstance: MatDialogRef<EditColumnComponent> =
      this.dialog.open(EditColumnComponent);

    dialogInstance.componentInstance.columnProcessed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.columnService.add(dialogInstance.componentInstance.title);
        dialogInstance.close();
      });
  }

  public dropColumn(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.columnService.updateOrder(
        this.columns,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public addNewTaskInColumn(
    event: Task['title'],
    columnId: Column['id'],
  ): void {
    const newTask: Task = this.taskService.create(event);
    this.columnService.addTask(newTask, columnId);
  }

  public titleSwitchClick(): void {
    this.titleSwitch = !this.titleSwitch;
  }

  public titleSwitchClickAndSave(): void {
    this.titleSwitchClick();
    this.boardsService.updateBoard(
      this.board.id,
      this.title,
      this.board.description,
    );
  }

  private initColumnListStateObserver(): void {
    this.columnList$ = this.columnService.setState(this.columns);
    this.columnList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((columns: Column[]) => {
        this.columns = columns;
      });
  }
}
