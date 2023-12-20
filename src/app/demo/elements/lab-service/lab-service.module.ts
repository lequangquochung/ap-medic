import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListServiceComponent } from './list-service/list-service.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
// import { ColorPickerModule } from 'primeng/colorpicker';
import { ColorPickerModule } from 'ngx-color-picker';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        pathMatch: 'full',
        component: ListServiceComponent
      },
      {
        path: 'create-service',
        component: CreateServiceComponent
      },
      {
        path: ':serviceId/edit-service',
        component: EditServiceComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    ListServiceComponent,
    EditServiceComponent,
    CreateServiceComponent,
  ],
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ToastModule,
    ConfirmPopupModule ,
    ColorPickerModule,

  ],
  exports: [RouterModule],
})
export class LabServiceModule { }
