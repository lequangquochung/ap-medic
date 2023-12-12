import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IEmployeeCreate } from 'src/app/models/IEmployeee';
import { EmployeeService } from 'src/app/services/employee/employee-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListEmployeeComponent implements OnInit {
  employees: IEmployeeCreate[] = [];
  baseDomain: string = environment.apiUrl;

  constructor(private router: Router,
    private employeeService: EmployeeService,
    private confirmationService: ConfirmationService,
    private _sanitizer: DomSanitizer,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  protected onEdit(employeeId: string): void {
    this.router.navigate([`/app/employee/${employeeId}/edit`]);
  }

  protected getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        if (res.success) {
          this.employees = res.data
          this.employees.map((item: any) => {
            item.avatar = this.convertToImg(item.avatar);
          })
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  protected onDelete(id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Xoá nhân viên này ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeService.deleteEmployee(id).subscribe({
          next: (res) => {
            if (res.success) {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xoá nhân viên thành công' });
              this.getEmployees();
            }
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
      }
    });



  }

  convertToImg(stringBase: string): SafeUrl {
    const imageUrl = stringBase;
    return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  protected getDefaultAvatar(e: Event) {
    const imgElement = e.target as HTMLImageElement;
    imgElement.src = 'assets/images/user/default-avatar.png';
  }

  onImageError(entity: any): void {
    entity.imageUrl = 'some-image.svg'
  }
}
