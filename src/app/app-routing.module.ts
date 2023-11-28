import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import LoginComponent from './demo/pages/authentication/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';

const routes: Routes = [
  {
    path: 'app',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/default/default.component'),
      },
      // {
      //   path: 'typography',
      //   loadComponent: () => import('./demo/elements/typography/typography.component')
      // },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      },
      {
        path: 'employee',
        loadChildren: () => import('./demo/elements/employee/employee.module').then((m)=>m.EmployeeModule),
      },
      {
        path:'news',
        loadChildren: () => import('./demo/elements/technews/tech-news.module').then((m) => m.TechNewsModule)
      },
      {
        path:'lab-service',
        loadChildren: () => import('./demo/elements/lab-service/lab-service.module').then((m) => m.LabServiceModule)
      }
    ],
  },
  { 
    path: 'login', 
    component: LoginComponent , 
  },
  {
    path:'**',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
