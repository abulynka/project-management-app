import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { BoardsComponent } from './pages/boards/boards.component';
import { BoardComponent } from './pages/board/board.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TaskComponent } from './pages/task/task.component';
import { TaskColumnComponent } from './components/task-column/task-column.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EditBoardComponent } from './components/edit-board/edit-board.component';
import { ConfirmationModalModule } from '../shared/confirmation-modal/confirmation-modal.module';
import { Store } from '@ngrx/store';
import { ProjectManagementState } from '../redux/state.models';
import { ProjectManagementActionType } from '../redux/actions/project-management.action';

@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    NotFoundComponent,
    TaskComponent,
    EditTaskComponent,
    TaskColumnComponent,
    EditBoardComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    FormsModule,
    ProjectManagementRoutingModule,
    DragDropModule,
    TranslateModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    ConfirmationModalModule,
    MatDialogModule,
  ],
  exports: [BoardsComponent, EditBoardComponent],
})
export class ProjectManagementModule {
  public constructor(private store: Store<ProjectManagementState>) {
    this.store.dispatch({ type: ProjectManagementActionType.LoadBoards });
  }
}
