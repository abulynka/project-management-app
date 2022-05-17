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

  public tasks!: Task[];

  public isEditMode: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private dialog: MatDialog,
    private tasksService: TasksService,
    private columnService: ColumnService,
    private columnsService: ColumnsService,
    private translateService: TranslateService,
  ) {}

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
  }

  public drop(event: CdkDragDrop<any[]>): void {
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
        const newTask: NewTask = editTask.newTask;
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

  public onDeleteColumn(): void {
    this.deleteColumn.emit(this.columnId);
  }

  public onDeleteTask(taskId: string, taskTitle: string): void {
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
}
