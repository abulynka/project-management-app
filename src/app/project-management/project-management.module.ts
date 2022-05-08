import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TaskColumnComponent } from './components/task-column/task-column.component';

@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    NotFoundComponent,
    TaskColumnComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProjectManagementRoutingModule,
    DragDropModule,
    TranslateModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [BoardsComponent],
})
export class ProjectManagementModule {}
