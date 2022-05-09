import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { WelcomeComponent } from './core/pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'boards',
    loadChildren: async () =>
      import('./project-management/project-management.module').then(
        (m: { ProjectManagementModule: any }) => {
          return m.ProjectManagementModule;
        },
      ),
  },
  {
    path: 'auth',
    loadChildren: async () =>
      import('./auth/auth.module').then((m: { AuthModule: any }) => {
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
