import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';

import { FileUploadComponent } from '../core/components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    NotFoundComponent,
    FileUploadComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ProjectManagementRoutingModule,
    TranslateModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  exports: [BoardsComponent],
})
export class ProjectManagementModule {}
