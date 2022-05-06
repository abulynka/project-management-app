import { Component } from '@angular/core';
import { FileService } from 'src/app/project-management/services/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  public body: any = {
    taskId: 'fa6675ba-f976-46bf-a656-0abdf2c55772',
    file: '',
  };

  public file: File | null = null;

  public constructor(private fileService: FileService) {}

  public onFilechange(event: any): void {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  public upload(): void {
    console.log(this.body.taskId, this.file);
    if (this.file) {
      this.fileService
        .upload(this.body.taskId, this.file)
        .subscribe((resp: Response) => {
          console.log(resp);
          alert('Uploaded');
        });
    } else {
      alert('Please select a file first');
    }
  }
}
