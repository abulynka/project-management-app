import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { ColumnService } from '../../services/column.service';
import { Board, Column, Task } from '../../models/boards.model';
import { select, Store } from '@ngrx/store';
import { ProjectManagementState } from '../../../redux/state.models';
import { getBoardById } from '../../../redux/selectors/project-management.selector';

import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public board: Board = {} as Board;

  public columnList$: BehaviorSubject<[] | Column[]> | null = null;

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private store: Store<ProjectManagementState>,
    private taskService: TaskService,
  ) {}

  public ngOnInit(): void {
    this.store
      .pipe(
        select(getBoardById(this.route.snapshot.params['id'])),
        takeUntil(this.destroy$),
      )
      .subscribe((board: Board | undefined) => {
        if (board) {
          this.board = board;
          this.initColumnListStateObserver();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onAddColumn(title: string = 'default'): void {
    this.columnService.add(title);
  }

  public dropColumn(event: CdkDragDrop<any[]>): void {
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

  public addNewTaskInColumn(
    event: Task['title'],
    columnId: Column['id'],
  ): void {
    const newTask: Task = this.taskService.create(event);
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
