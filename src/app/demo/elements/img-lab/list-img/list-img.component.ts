import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ImgLabService } from 'src/app/services/img-lab/img-lab.service';

@Component({
  selector: 'app-list-img',
  templateUrl: './list-img.component.html',
  styleUrls: ['list-img.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ListImgComponent implements OnInit {

  data: any[] | undefined

  displayCustom: boolean | undefined;

  activeIndex: number = 0;
  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  constructor(private imgLabService: ImgLabService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.getAllPhoto();
  }

  getAllPhoto() {
    this.imgLabService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data.map(item => {
            item.image = this.convertToImg(item.image);
            return item;
          });
        }
      }
    })
  }

  convertToImg(stringBase: string): SafeUrl {
    const imageUrl = stringBase;
    return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }

  clickToDelete(id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Xoá ảnh này ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.imgLabService.delete(id).subscribe({
          next:(res) => {
            if(res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xoá thành công' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
            }
            this.getAllPhoto();
          }, 
          error:() => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
          }
        })
      }
    });
  }
}
