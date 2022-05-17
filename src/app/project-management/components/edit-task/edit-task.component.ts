import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import {
  NewTask,
  UpdateTask,
} from 'src/app/project-management/models/boards.model';
import { Observable, Subject } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  public task: FormGroup = {} as FormGroup;

  public taskId: string | null = null;

  public userId: string = `${this.storageService.getUser()?.id}`;

  public editTaskProcessedSource: Subject<void> = new Subject<void>();

  public editTaskProcessed$: Observable<void> =
    this.editTaskProcessedSource.asObservable();

  private updateTaskInstance: UpdateTask | undefined;

  public constructor(
    public storageService: TokenStorageService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { updateTask: UpdateTask | undefined },
  ) {
    if (data) {
      this.updateTaskInstance = data.updateTask;
    }
  }

  public get newTask(): NewTask {
    return {
      title: this.task.get('title')?.value,
      order: parseInt(this.task.get('order')?.value),
      description: this.task.get('description')?.value,
      userId: this.userId,
      done: false,
    };
  }

  public get updateTask(): UpdateTask {
    return {
      title: this.task.get('title')?.value,
      order: parseInt(this.task.get('order')?.value),
      description: this.task.get('description')?.value,
      userId: this.updateTaskInstance?.userId || '',
      columnId: this.updateTaskInstance?.columnId || '',
      boardId: this.updateTaskInstance?.boardId || '',
      done: this.updateTaskInstance?.done || false,
    };
  }

  public ngOnInit(): void {
    this.initEditTaskForm();
  }

  public onSubmit(): void {
    this.editTaskProcessedSource.next();
  }

  private initEditTaskForm(): void {
    this.task = this.formBuilder.group({
      title: new FormControl(this.updateTaskInstance?.title, [
        Validators.required,
      ]),
      order: new FormControl(this.updateTaskInstance?.order, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      description: new FormControl(this.updateTaskInstance?.description, [
        Validators.required,
      ]),
    });
  }
}
