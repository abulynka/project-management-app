import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { EditTaskComponent } from './edit-task.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    /*EditTaskComponent*/
  ],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule],
  exports: [
    /*EditTaskComponent*/
  ],
})
export class ConfirmationModalModule {}
