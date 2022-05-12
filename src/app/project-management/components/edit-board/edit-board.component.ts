import { Component, Inject, OnDestroy } from '@angular/core';
import { Board, BoardShort } from '../../models/boards.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ProjectManagementState } from '../../../redux/state.models';
import {
  createdBoard,
  ProjectManagementActionType,
  updatedBoard,
} from '../../../redux/actions/project-management.action';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss'],
})
export class EditBoardComponent implements OnDestroy {
  public boardForm: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
  });

  public board: Board | BoardShort | undefined;

  public boardProcessedSource: Subject<string> = new Subject<string>();

  public boardProcessed$: Observable<string> =
    this.boardProcessedSource.asObservable();

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private store: Store<ProjectManagementState>,
    @Inject(MAT_DIALOG_DATA)
    public data: { board: BoardShort | Board | undefined },
  ) {
    if (data) {
      this.board = data.board;
      this.boardForm.get('title')?.setValue(this.board?.title);
      this.boardForm.get('description')?.setValue(this.board?.description);
    }
  }

  public onSubmit(): void {
    if (this.board) {
      this.store.dispatch({
        type: ProjectManagementActionType.UpdateBoard,
        payload: {
          id: this.board.id,
          title: this.boardForm.get('title')?.value,
          description: this.boardForm.get('description')?.value,
        },
      });

      this.store
        .pipe(select(updatedBoard), takeUntil(this.destroy$))
        .subscribe(() => {
          this.boardProcessedSource.next(`${this.board?.id}`);
        });
    } else {
      this.store.dispatch({
        type: ProjectManagementActionType.CreateBoard,
        payload: {
          title: this.boardForm.get('title')?.value,
          description: this.boardForm.get('description')?.value,
        },
      });

      this.store
        .pipe(select(createdBoard), takeUntil(this.destroy$))
        .subscribe((value: any) => {
          this.boardProcessedSource.next(
            value.projectManagement.createdBoard.id,
          );
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
