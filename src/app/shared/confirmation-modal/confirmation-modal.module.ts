import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ConfirmationModalComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [ConfirmationModalComponent],
})
export class ConfirmationModalModule {}
