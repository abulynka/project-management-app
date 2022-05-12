import { Component, Inject, OnDestroy } from '@angular/core';
import { Board, BoardShort } from '../../models/boards.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ProjectManagementState } from '../../../redux/state.models';
import {
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
    }
  }

  public onSubmit(): void {
    if (this.board) {
      this.store.dispatch({
        type: ProjectManagementActionType.UpdateBoard,
        payload: {
          id: this.board.id,
          title: this.boardForm.get('title')?.value,
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
        payload: this.boardForm.get('title')?.value,
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
