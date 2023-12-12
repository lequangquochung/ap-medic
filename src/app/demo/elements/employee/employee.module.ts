import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import EmployeeComponent from './employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list-employee',
        pathMatch: 'full',
      },
      {
        path: 'list-employee',
        component: ListEmployeeComponent
      },
      {
        path: 'create-employee',
        component: CreateEmployeeComponent
      },
      {
        path: ':employeeId/edit',
        component: EditEmployeeComponent
      }
    ],
  },
];


@NgModule({
  declarations: [
    ListEmployeeComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmPopupModule ,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class EmployeeModule { }
