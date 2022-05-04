import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { BoardsComponent } from './pages/boards/boards.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BoardComponent } from './pages/board/board.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BoardsComponent, BoardComponent, NotFoundComponent],
  imports: [CommonModule, ProjectManagementRoutingModule, TranslateModule],
  exports: [BoardsComponent],
})
export class ProjectManagementModule {}
