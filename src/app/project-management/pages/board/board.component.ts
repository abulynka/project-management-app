/* eslint-disable */

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

const board = {
  id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
  title: 'Homework tasks',
  columns: [
    {
      id: '7b0b41b3-c01e-4139-998f-3ff25d20dc4f',
      title: 'Done',
      order: 1,
      tasks: [
        {
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
          title: 'Task: pet',
          order: 1,
          done: false,
          description: 'Domestic cat needs to be stroked gently',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
        {
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
          title: 'Task: the',
          order: 2,
          done: false,
          description: 'Domestic cat needs to be stroked gently',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
        {
          id: '6e3abe9c-ceb1-40fa-9a04-eb2b2184daf9',
          title: 'Task: cat',
          order: 3,
          done: false,
          description: 'Domestic cat needs to be stroked gently',
          userId: 'b2d92061-7d23-4641-af52-dd39f95b99f8',
          files: [
            {
              filename: 'foto.jpg',
              fileSize: 6105000,
            },
          ],
        },
      ],
    },
  ],
};

import { BehaviorSubject } from 'rxjs';
import { ColumnService, TaskColumn } from '../../services/column.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public title: string = 'Board title';

  public columns!: TaskColumn[] | [];

  private boardData: any;

  private columnList$: BehaviorSubject<[] | TaskColumn[]> | null = null;

  public constructor(private columnService: ColumnService) {}

  public ngOnInit(): void {
    // TODO: get boardData by boardID from route
    this.boardData = board;
    this.initColumnListStateObserver();
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
      this.columns,
      event.previousIndex,
      event.currentIndex,
    );
  }

  private initColumnListStateObserver(): void {
    this.columnList$ = this.columnService.setState(this.boardData.columns);
    this.columnList$.subscribe((list: TaskColumn[]) => {
      this.columns = list;
    });
  }
}
