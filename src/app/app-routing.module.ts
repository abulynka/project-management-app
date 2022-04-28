import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full',
  },
  {
    path: 'boards',
    loadChildren: async () =>
      // eslint-disable-next-line @typescript-eslint/typedef
      import('./project-management/project-management.module').then((m) => {
        return m.ProjectManagementModule;
      }),
  },
  {
    path: 'login',
    loadChildren: async () =>
      // eslint-disable-next-line @typescript-eslint/typedef
      import('./auth/auth.module').then((m) => {
        return m.AuthModule;
      }),
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
