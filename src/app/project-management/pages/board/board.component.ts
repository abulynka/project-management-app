import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';

import { ColumnService } from '../../services/column.service';
import { Board, Column } from '../../models/boards.model';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public board: Board = {} as Board;

  private columnList$: BehaviorSubject<[] | Column[]> | null = null;

  public constructor(
    private columnService: ColumnService,
    private route: ActivatedRoute,
    private router: Router,
    private boardsService: BoardsService,
  ) {}

  public ngOnInit(): void {
    this.boardsService
      .getBoardById(this.route.snapshot.params['id'])
      .subscribe((board: Board): void => {
        this.board = board;
        this.initColumnListStateObserver();
      });
  }

  public onAddColumn(title: string = 'default'): void {
    this.columnService.add(title);
  }

  public drop(event: CdkDragDrop<any[]>): void {
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

  private initColumnListStateObserver(): void {
    this.columnList$ = this.columnService.setState(this.board.columns);
    this.columnList$.subscribe((columns: Column[]) => {
      this.board.columns = columns;
    });
  }
}
