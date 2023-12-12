import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IEmployeeCreate } from 'src/app/models/IEmployeee';
import { EmployeeService } from 'src/app/services/employee/employee-service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CreateEmployeeComponent implements OnInit {


  fileUploadEmployee?: File;
  fileData: any;
  fileName?: string;
  createForm = this.fb.group({
    fullName: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    degree: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void { }

  registerEmployee() {
    const payload = {
      fullName: this.createForm.get('fullName').value,
      description: this.createForm.get('description').value,
      degree: this.createForm.get('degree').value,
      avatar: this.fileData
    }
    this.employeeService.createEmployee(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tạo bài viết thành công' });
        this.createForm.reset();
        this.fileData = null;
      },
      error: (e) => {
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

  protected getDefaultAvatar(e: Event) {
    const imgElement = e.target as HTMLImageElement;
    imgElement.src = 'assets/images/user/default-avatar.png';
  }



}
