import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import LoginComponent from './demo/pages/authentication/login/login.component';
import { ListEmployeeComponent } from './demo/elements/employee/list-employee/list-employee.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/default/default.component')
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
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
        loadChildren: () => import('./demo/elements/employee/employee.module').then((m)=>m.EmployeeModule)
      },
      
      // {
      //   path: 'login',
      //   loadComponent: () => import('./demo/pages/authentication/login/login.component')
      // }
    ]
  },
  { path: 'login', component: LoginComponent },
  // {
  //   path: '',
  //   component: GuestComponent,
  //   children: [
  //     {
  //       path: 'guest',
        // loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
  //       // loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
  //     }
  //   ]
  // }
  
  {
    path:'**',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
