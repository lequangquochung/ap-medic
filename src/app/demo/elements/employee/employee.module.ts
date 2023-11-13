import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import EmployeeComponent from './employee.component';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    children: [
        {
        path: 'list-employee',
        component: ListEmployeeComponent
      },
      {
        path: 'create-employee',
        component: CreateEmployeeComponent
      },
    ],
  },
];


@NgModule({
  declarations: [ListEmployeeComponent, EmployeeComponent, CreateEmployeeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class EmployeeModule { }
