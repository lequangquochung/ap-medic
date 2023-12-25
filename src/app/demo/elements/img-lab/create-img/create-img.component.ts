import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ImgLabService } from 'src/app/services/img-lab/img-lab.service';

@Component({
  selector: 'app-create-img',
  templateUrl: './create-img.component.html',
  styleUrls: ['create-img.component.scss'],
  providers: [MessageService]
})
export class CreateImgComponent implements OnInit {
  @ViewChild('myInputFile')
  myInputVariable?: ElementRef;
  fileData: any;
  imageForm: any;
  typeImg: any;
  dataType = [
    {
      index: 1,
      value: 'dashboard'
    },
    {
      index: 2,
      value: 'lab'
    },
  ]

  constructor(private imgLabService: ImgLabService,
    private messageService: MessageService) {
    this.typeImg = 'dashboard';
  }

  get isDashboard() {
    return this.typeImg === 'dashboard'
  }

  ngOnInit(): void { }

  createImg(isLab?: boolean) {
    const payload = {
      image: this.imageForm
    }

    if (isLab) {
      this.imgLabService.uploadForLab(payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tải ảnh lên thành công' });
            this.myInputVariable.nativeElement.value = "";
            this.imageForm = "";
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Tải ảnh lên không thành công' });
        }
      });
    } else {
      this.imgLabService.uploadForLandingPage(payload).subscribe({
        next: (res) => {
          if (res.success) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tải ảnh lên thành công' });
            this.myInputVariable.nativeElement.value = "";
            this.imageForm = "";
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Tải ảnh lên không thành công' });
        }
      });
    }
  }

  protected handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileData = reader.result
    };
  }

  protected readURL(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imageForm = event.srcElement.files;
      let reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageForm = reader.result;
        };
      }
    }
  }

}
