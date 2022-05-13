import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import {
  NewTask,
  UpdateTask,
} from 'src/app/project-management/models/boards.model';
import { TasksService } from 'src/app/project-management/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  public errorMessage: boolean = false;

  public task: FormGroup = {} as FormGroup;

  public taskId: string | null = null;

  public userId?: string | null = this.storageService.getUser()?.id;

  public constructor(
    public storageService: TokenStorageService,
    public taskService: TasksService,
    private formBuilder: FormBuilder,
  ) {}

  public get title(): AbstractControl | null {
    return this.task.get('title');
  }

  public get description(): AbstractControl | null {
    return this.task.get('description');
  }

  public get order(): AbstractControl | null {
    return this.task.get('order');
  }

  public ngOnInit(): void {
    this.initEditTaskForm();
  }

  public onSubmit(): void {
    const board: string = '';
    const column: string = '';
    this.taskId
      ? this.updateTask(board, column, this.taskId)
      : this.createNewTask(board, column);
  }

  public updateTask(board: string, column: string, taskId: string): void {
    const body: UpdateTask = {
      title: this.title?.value,
      order: Number(this.order?.value),
      description: this.description?.value,
      userId: this.userId as string,
      columnId: column,
      boardId: board,
    };
    if (this.task.status === 'VALID') {
      this.taskService.updateTask(board, column, taskId, body).subscribe({
        next: () => {},
      });
    } else {
      this.errorMessage = true;
    }
  }

  public createNewTask(board: string, column: string): void {
    const body: NewTask = {
      title: this.title?.value,
      order: Number(this.order?.value),
      description: this.description?.value,
      userId: this.userId as string,
    };
    if (this.task.status === 'VALID') {
      this.taskService.createTask(board, column, body).subscribe({
        next: () => {},
      });
    } else {
      this.errorMessage = true;
    }
  }

  private initEditTaskForm(): void {
    this.task = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      order: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      description: new FormControl('', [Validators.required]),
    });
  }
}
