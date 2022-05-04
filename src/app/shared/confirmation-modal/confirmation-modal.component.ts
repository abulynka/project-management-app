import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  public title: string = '';

  public message: string = '';

  public constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationModalComponent,
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  public onYes(): void {
    this.dialogRef.close(true);
  }

  public onNo(): void {
    this.dialogRef.close(false);
  }
}
