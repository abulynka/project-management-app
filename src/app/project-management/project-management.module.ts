import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { BoardsComponent } from './pages/boards/boards.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MatListModule } from '@angular/material/list';
import { BoardComponent } from './pages/board/board.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BoardsComponent, BoardComponent, NotFoundComponent],
  imports: [
    FormsModule,
    CommonModule,
    ProjectManagementRoutingModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [BoardsComponent],
})
export class ProjectManagementModule {}
