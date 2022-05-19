import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NewTask, Task, TaskResponse } from '../../models/boards.model';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TasksService } from '../../services/tasks.service';
import { Subject, takeUntil } from 'rxjs';
import { ColumnService } from '../../services/column.service';
import { ColumnsService } from '../../services/columns.service';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.scss'],
})
export class TaskColumnComponent implements OnInit, OnDestroy {
  @Output() public deleteColumn: EventEmitter<string> =
    new EventEmitter<string>();

  @Input() public title!: string;

  @Input() public boardId!: string;

  @Input() public columnId!: string;

  @Input() public columnOrder!: number;

  public isEditMode: boolean = false;

  private tasksData: Task[] = [];

  private destroy$: Subject<void> = new Subject<void>();

  private titleSave: string = '';

  public constructor(
    private dialog: MatDialog,
    private tasksService: TasksService,
    private columnService: ColumnService,
    private columnsService: ColumnsService,
    private translateService: TranslateService,
  ) {}

  public get tasks(): Task[] {
    return this.tasksData;
  }

  public set tasks(tasks: Task[]) {
    this.tasksData = tasks.sort((task1: Task, task2: Task): number => {
      if (task1.order < task2.order) {
        return -1;
      } else if (task1.order > task2.order) {
        return 1;
      }
      return 0;
    });
  }

  public ngOnInit(): void {
    this.tasksService
      .getAllTasks(this.boardId, this.columnId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks: TaskResponse[]) => {
        this.tasks = tasks;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public titleSwitchClick(): void {
    if (!this.isEditMode) {
      this.titleSave = this.title;
    }
    this.isEditMode = !this.isEditMode;
  }

  public titleSwitchClickSubmit(): void {
    this.titleSwitchClick();
    this.columnsService
      .updateColumn(this.boardId, this.columnId, {
        title: this.title,
        order: this.columnOrder,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {});
  }

  public titleSwitchClickCancel(): void {
    this.titleSwitchClick();
    this.title = this.titleSave;
  }

  public dropTask(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const indexFrom: number = Math.min(
        event.previousIndex,
        event.currentIndex,
      );

      this.reorderTasks(event.container.data, indexFrom);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const task: Task = event.item.data;
      const previousColumnId: string = task.columnId;
      task.columnId = this.columnId;
      const { id, files, ...updateTask }: any = task;

      this.tasksService
        .updateTask(this.boardId, previousColumnId, task.id, updateTask)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.reorderTasks(event.container.data, 0);
        });
    }
  }

  public onEditTask(task: Task): void {
    const instance: EditTaskComponent = this.dialog.open(EditTaskComponent, {
      data: {
        updateTask: task,
      },
    }).componentInstance;

    instance.editTaskProcessed$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.tasksService
        .updateTask(this.boardId, this.columnId, task.id, instance.updateTask)
        .pipe(takeUntil(this.destroy$))
        .subscribe((taskResponse: TaskResponse) => {
          this.tasks = this.tasks.map((taskItem: Task) => {
            if (taskItem.id === taskResponse.id) {
              return taskResponse;
            }
            return taskItem;
          });
          this.dialog.closeAll();
        });
    });
  }

  public onAddTask(): void {
    const editTask: EditTaskComponent =
      this.dialog.open(EditTaskComponent).componentInstance;

    editTask.editTaskProcessed$
      .pipe(takeUntil(this.destroy$))
      .subscribe((): void => {
        const newTask: NewTask = this.columnService.newTask(editTask.newTask);
        this.dialog.closeAll();

        this.tasksService
          .createTask(this.boardId, this.columnId, newTask)
          .pipe(takeUntil(this.destroy$))
          .subscribe((task: TaskResponse) => {
            this.columnService.addTask(task);
            this.tasks.push(task);
          });
      });
  }

  public onDeleteColumn(event: MouseEvent): void {
    event.stopPropagation();
    this.deleteColumn.emit(this.columnId);
  }

  public onDeleteTask(
    event: MouseEvent,
    taskId: string,
    taskTitle: string,
  ): void {
    event.stopPropagation();
    this.translateService
      .get(['task-column.delete-title', 'task-column.delete-message'])
      .subscribe((translates: Record<string, string>) => {
        this.dialog
          .open(ConfirmationModalComponent, {
            minWidth: '320px',
            data: {
              title: translates['task-column.delete-title'],
              message: `${translates['task-column.delete-message']} ${taskTitle}?`,
            },
          })
          .afterClosed()
          .subscribe((result: boolean) => {
            if (result) {
              this.tasksService
                .deleteTask(this.boardId, this.columnId, taskId)
                .pipe(takeUntil(this.destroy$))
                .subscribe((): void => {
                  this.tasks = this.tasks.filter(
                    (task: Task) => task.id !== taskId,
                  );
                });
            }
          });
      });
  }

  private reorderTasks(updateTasks: Task[], indexFrom: number): void {
    for (let i: number = indexFrom; i < updateTasks.length; ++i) {
      const { id, files, ...task }: any = updateTasks[i];

      if (updateTasks[i].order === i + 1) {
        continue;
      }

      updateTasks[i].order = i + 1;
      task.order = i + 1;

      this.tasksService
        .updateTask(this.boardId, this.columnId, id, task)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }
}
