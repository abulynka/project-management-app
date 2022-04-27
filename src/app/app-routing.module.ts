import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full',
  },
  {
    path: 'boards',
    loadChildren: async () =>
      import('./project-management/project-management.module').then(
        // eslint-disable-next-line @typescript-eslint/typedef
        (m) => {
          return m.ProjectManagementModule;
          // eslint-disable-next-line @typescript-eslint/comma-dangle
        }
      ),
  },
  {
    path: 'login',
    loadChildren: async () =>
      // eslint-disable-next-line @typescript-eslint/typedef
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    loadChildren: async () =>
      // eslint-disable-next-line @typescript-eslint/typedef
      import('./core/core.module').then((m) => m.CoreModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
