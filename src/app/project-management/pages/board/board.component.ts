import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject, forkJoin, Subject, takeUntil } from 'rxjs';

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
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public board: BoardShort = {} as BoardShort;

  public columnsData: ColumnResponse[] = [];

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
    private translateService: TranslateService,
  ) {}

  public get columns(): ColumnResponse[] {
    return this.columnsData;
  }

  public set columns(columns: ColumnResponse[]) {
    if (columns) {
      this.columnsData = [...columns].sort(
        (column1: ColumnResponse, column2: ColumnResponse) => {
          if (column1.order < column2.order) {
            return -1;
          } else if (column1.order > column2.order) {
            return 1;
          }
          return 0;
        },
      );
    }
  }

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
    this.translateService
      .get(['column.delete-title', 'column.delete-message'])
      .subscribe((translates: Record<string, string>) => {
        this.dialog
          .open(ConfirmationModalComponent, {
            minWidth: '320px',
            data: {
              title: translates['column.delete-title'],
              message: `${translates['column.delete-message']}?`,
            },
          })
          .afterClosed()
          .subscribe((result: boolean) => {
            if (result) {
              this.columnsService
                .deleteColumn(this.board.id, columnId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                  this.columns = this.columns.filter(
                    (column: ColumnResponse) => column.id !== columnId,
                  );
                });
            }
          });
      });
  }

  public addColumn(): void {
    const dialogInstance: MatDialogRef<EditColumnComponent> =
      this.dialog.open(EditColumnComponent);

    dialogInstance.componentInstance.columnProcessed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const column: ColumnResponse = this.columnService.newColumn(
          dialogInstance.componentInstance.title,
        );
        dialogInstance.close();

        this.columnsService
          .createColumn(this.board.id, {
            title: column.title,
            order: column.order,
          } as NewColumn)
          .pipe(takeUntil(this.destroy$))
          .subscribe((columnResponse: ColumnResponse) => {
            this.columnService.add(columnResponse);
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
      const columns: ColumnResponse[] = this.columnService.updateOrder(
        this.columns,
        event.previousIndex,
        event.currentIndex,
      );

      let max: number = 4096;

      const wait: any[] = [];
      columns.forEach((column: ColumnResponse) => {
        wait.push(
          this.columnsService.updateColumn(this.board.id, column.id, {
            title: column.title,
            order: max--,
          }),
        );
      });

      forkJoin(wait)
        .pipe(takeUntil(this.destroy$))
        .subscribe((): void => {
          columns.forEach((column: ColumnResponse) => {
            const { id, ...newColumn }: any = {
              ...column,
            };

            this.columnsService
              .updateColumn(this.board.id, column.id, newColumn)
              .pipe(takeUntil(this.destroy$))
              .subscribe();
          });
        });
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
