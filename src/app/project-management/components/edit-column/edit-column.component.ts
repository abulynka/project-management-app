import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-edit-column',
  templateUrl: './edit-column.component.html',
  styleUrls: ['./edit-column.component.scss'],
})
export class EditColumnComponent implements OnInit, OnDestroy {
  public columnForm!: FormGroup;

  public columnProcessedSource: Subject<void> = new Subject<void>();

  public columnProcessed$: Observable<void> =
    this.columnProcessedSource.asObservable();

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(private formBuilder: FormBuilder) {}

  public get title(): string {
    return `${this.columnForm.get('title')?.value}`;
  }

  public ngOnInit(): void {
    this.columnForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    if (this.columnForm.status === 'VALID') {
      this.columnProcessedSource.next();
    }
  }
}
