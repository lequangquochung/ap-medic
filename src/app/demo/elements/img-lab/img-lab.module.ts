import { RouterModule, Routes } from "@angular/router";
import { CreateImgComponent } from "./create-img/create-img.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { NgModule } from "@angular/core";
import { ListImgComponent } from "./list-img/list-img.component";
import { GalleriaModule } from 'primeng/galleria';
import { RadioButtonModule } from 'primeng/radiobutton';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'list-photo',
          pathMatch: 'full',
          component: ListImgComponent
        },
        {
          path: 'add-image',
          pathMatch: 'full',
          component: CreateImgComponent
        },
      ]
    }
  ]

@NgModule({
    declarations: [
        CreateImgComponent,
        ListImgComponent
    ],
    imports: [
        CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      ToastModule,
      ConfirmPopupModule ,
      GalleriaModule,
      RadioButtonModule
    ],
    exports: [RouterModule],
  })

export class ImgLabModule { }