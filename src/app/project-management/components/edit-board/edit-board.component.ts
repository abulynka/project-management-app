import { Component, Inject, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { Board, BoardResponse, BoardShort } from '../../models/boards.model';
import { Observable, Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  AbstractControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss'],
})
export class EditBoardComponent implements OnInit {
  public errorMessage: boolean = false;

  public boardForm: FormGroup = {} as FormGroup;

  public board: Board | BoardShort | undefined;

  public boardProcessedSource: Subject<string> = new Subject<string>();

  public boardProcessed$: Observable<string> =
    this.boardProcessedSource.asObservable();

  public constructor(
    private formBuilder: FormBuilder,
    private boardsService: BoardsService,
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

  public ngOnInit(): void {
    this.initEditBoardForm();
  }

  public onSubmit(): void {
    let afterProcess: Observable<BoardResponse>;
    if (this.boardForm.status === 'VALID') {
      if (this.board) {
        afterProcess = this.boardsService.updateBoard(
          this.board.id,
          this.boardForm.get('title')?.value,
        );
      } else {
        afterProcess = this.boardsService.createBoard(
          this.boardForm.get('title')?.value,
        );
      }
      afterProcess.subscribe((response: BoardResponse) => {
        this.boardProcessedSource.next(response.id);
      });
    } else {
      this.errorMessage = true;
    }
  }

  private initEditBoardForm(): void {
    this.boardForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
    });
    this.boardForm.get('title')?.setValue(this.board?.title);
  }
}
