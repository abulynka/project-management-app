import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { ColumnService } from '../../services/column.service';
import {
  BoardShort,
  ColumnResponse,
  NewColumn,
} from '../../models/boards.model';
import { select, Store } from '@ngrx/store';
import { BoardsState } from '../../../redux/state.models';
import { getBoardById } from '../../../redux/selectors/boards.selector';

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

  public columns: ColumnResponse[] = [];

  public title: string = '';

  public columnList$: BehaviorSubject<[] | ColumnResponse[]> | null = null;

  public isEditMode: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private store: Store<BoardsState>,
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
            .subscribe((columns: ColumnResponse[]) => {
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

  public onDeleteColumn(columnId: string): void {
    this.columnsService
      .deleteColumn(this.board.id, columnId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.columns = this.columns.filter(
          (column: ColumnResponse) => column.id !== columnId,
        );
      });
  }

  public addColumn(): void {
    const dialogInstance: MatDialogRef<EditColumnComponent> =
      this.dialog.open(EditColumnComponent);

    dialogInstance.componentInstance.columnProcessed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const column: ColumnResponse = this.columnService.add(
          dialogInstance.componentInstance.title,
        );
        dialogInstance.close();

        console.log('here');

        this.columnsService
          .createColumn(this.board.id, {
            title: column.title,
            order: column.order,
          } as NewColumn)
          .pipe(takeUntil(this.destroy$))
          .subscribe((response: ColumnResponse) => {
            console.log(response);
          });
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

  public titleSwitchClick(): void {
    this.isEditMode = !this.isEditMode;
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
      .subscribe((columns: ColumnResponse[]) => {
        this.columns = columns;
      });
  }
}
