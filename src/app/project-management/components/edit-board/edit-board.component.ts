import { Component, Inject } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { Board, BoardResponse, BoardShort } from '../../models/boards.model';
import { Observable, Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss'],
})
export class EditBoardComponent {
  public boardForm: FormGroup = new FormGroup({
    title: new FormControl(),
  });

  public board: Board | BoardShort | undefined;

  public boardProcessedSource: Subject<string> = new Subject<string>();

  public boardProcessed$: Observable<string> =
    this.boardProcessedSource.asObservable();

  public constructor(
    private boardsService: BoardsService,
    @Inject(MAT_DIALOG_DATA)
    public data: { board: BoardShort | Board | undefined },
  ) {
    if (data) {
      this.board = data.board;
      this.boardForm.get('title')?.setValue(this.board?.title);
    }
  }

  public onSubmit(): void {
    let afterProcess: Observable<BoardResponse>;
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
  }
}
