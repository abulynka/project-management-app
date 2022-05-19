import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Board, BoardShort } from '../../models/boards.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  AbstractControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { BoardsState } from '../../../redux/state.models';
import {
  createdBoard,
  BoardsActionType,
  updatedBoard,
} from '../../../redux/actions/boards.action';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss'],
})
export class EditBoardComponent implements OnInit, OnDestroy {
  public boardForm!: FormGroup;

  public board: Board | BoardShort | undefined;

  public boardProcessedSource: Subject<string> = new Subject<string>();

  public boardProcessed$: Observable<string> =
    this.boardProcessedSource.asObservable();

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private formBuilder: FormBuilder,
    private store: Store<BoardsState>,
    @Inject(MAT_DIALOG_DATA)
    public data: { board: BoardShort | Board | undefined },
  ) {
    if (data) {
      this.board = data.board;
    }
  }

  public get title(): AbstractControl | null {
    return this.boardForm.get('title');
  }

  public get description(): AbstractControl | null {
    return this.boardForm.get('description');
  }

  public ngOnInit(): void {
    this.initEditBoardForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    if (this.boardForm.status === 'VALID') {
      if (this.board) {
        this.store.dispatch({
          type: BoardsActionType.UpdateBoard,
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
          type: BoardsActionType.CreateBoard,
          payload: {
            title: this.boardForm.get('title')?.value,
            description: this.boardForm.get('description')?.value,
          },
        });

        this.store
          .pipe(select(createdBoard), takeUntil(this.destroy$))
          .subscribe((value: any) => {
            this.boardProcessedSource.next(value.boards.createdBoard.id);
          });
      }
    }
  }

  private initEditBoardForm(): void {
    this.boardForm = this.formBuilder.group({
      title: new FormControl(this.board?.title, [Validators.required]),
      description: new FormControl(this.board?.description, [
        Validators.required,
      ]),
    });
  }
}
