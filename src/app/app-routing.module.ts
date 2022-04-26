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
        (m) => m.ProjectManagementModule,
      ),
  },
  {
    path: 'login',
    loadChildren: async () =>
      import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: '**',
    loadChildren: async () =>
      import('./core/core-routing.module').then((m) => m.CoreRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
