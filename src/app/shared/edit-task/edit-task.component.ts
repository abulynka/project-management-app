import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UpdateTask } from 'src/app/project-management/models/boards.model';
import { TasksService } from 'src/app/project-management/services/tasks.service';

const MIN_LENGTH: number = 3;

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  public errorMessage: boolean = false;

  public formTitle: string = 'edit';

  public task!: FormGroup;

  public userId?: string | null = this.storageService.getUser()?.id;

  public constructor(
    public storageService: TokenStorageService,
    public taskService: TasksService,
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
    const board: string = 'c45299bf-2fc8-46ff-8804-554a74b26435';
    const column: string = 'a9feb3ee-0041-4689-8341-0409930ff715';
    const taskId: string = 'fa6675ba-f976-46bf-a656-0abdf2c55772';
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
        next: (req: any) => {
          console.log(req);
        },
      });
    } else {
      this.errorMessage = true;
    }
  }

  public initEditTaskForm(): void {
    this.task = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_LENGTH),
      ]),
      order: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(MIN_LENGTH),
      ]),
    });
  }
}
