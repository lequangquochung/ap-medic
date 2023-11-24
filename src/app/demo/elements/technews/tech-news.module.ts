import { ListNewsComponent } from './list-news/list-news.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTechNewsComponent } from './create-tech-news/create-tech-news.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTechNewsComponent } from './edit-tech-news/edit-tech-news.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'list-news',
        pathMatch: 'full',
        component: ListNewsComponent
      },
      {
        path:'create-news',
        component: CreateTechNewsComponent
      },
      {
        path:':newsId/edit',
        component: EditTechNewsComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    CreateTechNewsComponent,
    EditTechNewsComponent,
    ListNewsComponent
  ],
    
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    AngularEditorModule,
    TableModule,
    InputTextModule
  ],
  exports: [RouterModule],
 
})
export class TechNewsModule { }
