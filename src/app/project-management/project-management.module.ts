import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { BoardsComponent } from './pages/boards/boards.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TaskColumnComponent } from './components/task-column/task-column.component';
import { BoardComponent } from './pages/board/board.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    NotFoundComponent,
    TaskColumnComponent,
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    DragDropModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [BoardsComponent],
})
export class ProjectManagementModule {}
