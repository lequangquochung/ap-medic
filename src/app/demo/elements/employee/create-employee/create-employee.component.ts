import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IEmployeeCreate } from 'src/app/models/IEmployeee';
import { EmployeeService } from 'src/app/services/employee/employee-service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {


  fileUploadEmployee?: File;
  fileName?: string;
  createForm = this.fb.group({
    fullName: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    degree: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void { }

  protected createEmployee() {
    this.employeeService.uploadAvatar(this.fileUploadEmployee[0]).subscribe({
      next: (res) => {
        this.fileName = res.data;
        this.registerEmployee();
      }
    });
  }

  registerEmployee() {
    const payload = {
      fullName: this.createForm.get('fullName').value,
      description: this.createForm.get('description').value,
      degree: this.createForm.get('degree').value,
      avatar: this.fileName
    }
    this.employeeService.createEmployee(payload).subscribe({
      next: (respone) => {
        console.log('res employee', respone);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  protected handleUpload(event: any) {
    if (event.target.files.length > 0) {
      this.fileUploadEmployee = event.srcElement.files;
    }
  }

  protected getDefaultAvatar(e: Event) {
    const imgElement = e.target as HTMLImageElement;
    imgElement.src = 'assets/images/user/default-avatar.png';
  }
  


}
