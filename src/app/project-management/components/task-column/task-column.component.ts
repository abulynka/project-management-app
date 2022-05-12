/* eslint-disable @typescript-eslint/indent */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  // transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from '../../models/boards.model';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.scss'],
})
export class TaskColumnComponent {
  @Input() public title!: string;

  @Input() public tasks!: Task[];

  @Output() public newTaskEvent: EventEmitter<Task['title']> = new EventEmitter<
    Task['title']
  >();

  public drop(event: CdkDragDrop<any[]>): void {
    console.log({event});
    
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public onAddTask(title: string = 'default'): void {
    this.newTaskEvent.emit(title + this.tasks.length);
  }
}
