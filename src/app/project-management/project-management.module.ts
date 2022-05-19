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
import { TaskColumnComponent } from './components/task-column/task-column.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { EditBoardComponent } from './components/edit-board/edit-board.component';
import { ConfirmationModalModule } from '../shared/confirmation-modal/confirmation-modal.module';
import { Store } from '@ngrx/store';
import { BoardsState } from '../redux/state.models';
import { BoardsActionType } from '../redux/actions/boards.action';
import { EditColumnComponent } from './components/edit-column/edit-column.component';
import { SearchBoxModule } from '../shared/search-box/search-box.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    BoardsComponent,
    BoardComponent,
    NotFoundComponent,
    EditTaskComponent,
    TaskColumnComponent,
    EditBoardComponent,
    EditColumnComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ProjectManagementRoutingModule,
    DragDropModule,
    TranslateModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ConfirmationModalModule,
    MatDialogModule,
    SearchBoxModule,
    MatTooltipModule,
  ],
  exports: [BoardsComponent, EditBoardComponent],
})
export class ProjectManagementModule {
  public constructor(private store: Store<BoardsState>) {
    this.store.dispatch({ type: BoardsActionType.LoadBoards });
  }
}
