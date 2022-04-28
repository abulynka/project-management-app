import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { BoardsComponent } from './pages/boards/boards.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [BoardsComponent, NotFoundComponent],
  imports: [CommonModule, ProjectManagementRoutingModule],
  exports: [BoardsComponent],
})
export class ProjectManagementModule {}
