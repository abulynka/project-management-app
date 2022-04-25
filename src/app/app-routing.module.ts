import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { BoardsComponent } from './project-management/pages/boards/boards.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { BoardComponent } from './project-management/pages/board/board.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'boards',
    component: BoardsComponent,
  },
  {
    path: 'boards/:id',
    component: BoardComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
