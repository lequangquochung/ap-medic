import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LabService } from 'src/app/services/lab-service/lab-service.service';

@Component({
  selector: 'app-list-service',
  styleUrls: ['list-service.component.scss'],
  templateUrl: './list-service.component.html',
  providers: [ConfirmationService, MessageService]
})
export class ListServiceComponent implements OnInit {

  data: any;

  constructor( private labService: LabService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,) {

  }
  ngOnInit(): void {
    this.getListLabService();
  }


  getListLabService() {
    this.labService.getListLabService().subscribe({
      next:(res) => {
        if (res.success) {
          this.data = res.data;
        }
      } 
    }) 
  }
  
  onEdit(id: string) {
    this.router.navigate([`/app/lab-service/${id}/edit-service`]);
  }

  onDelete(id:string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Xoá ảnh này ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.labService.delete(id).subscribe({
          next:(res) => {
            if(res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xoá thành công' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
            }
            this.getListLabService();
          }, 
          error:() => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
          }
        })
      }
    });
  }
}

