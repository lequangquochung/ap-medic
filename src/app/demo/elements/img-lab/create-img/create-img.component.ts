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

  constructor(private imgLabService: ImgLabService,
    private messageService: MessageService) { }
  ngOnInit(): void {

  }

  createImg() {
    const payload = {
      image: this.imageForm
    }

    this.imgLabService.create(payload).subscribe({
      next: (res) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tạo bài viết thành công' });
          this.myInputVariable.nativeElement.value = "";
          this.imageForm = "";
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
      }
    });
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
