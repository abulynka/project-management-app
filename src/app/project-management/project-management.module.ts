import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { BoardsComponent } from './pages/boards/boards.component';

@NgModule({
  declarations: [BoardsComponent],
  imports: [CommonModule, ProjectManagementRoutingModule],
  exports: [BoardsComponent],
})
export class ProjectManagementModule {}
