import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee/employee-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EditEmployeeComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private _sanitizer: DomSanitizer,
    private employeeService: EmployeeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,) { }

  imageForm: any;
  employee?: any;
  employeeId?: string;
  baseDomain: string = environment.apiUrl;
  dataForm = this.fb.group({
    fullName: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    // avatar: ['', Validators.required],
    degree: new FormControl<string>('', [Validators.required]),
  });
  fileData: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const employeeId = params.get('employeeId');
      this.employeeId = employeeId;
    });

    this.loadEmployeeData();
  }

  protected loadEmployeeData() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(res => {
      if (res.success) {
        this.dataForm.patchValue(res.data);
        this.imageForm = res.data.avatar;
        this.fileData = this.convertToImg(res.data.avatar);
      }
    });
  }

  protected editEmployee() {
    if (this.dataForm.valid) {
      let payload = {
        fullName: this.dataForm.get('fullName').value,
        description: this.dataForm.get('description').value,
        degree: this.dataForm.get('degree').value,
        avatar: this.imageForm
      }
      this.editPayload(payload);
    }
  }

  editPayload(payload: any) {
    this.employeeService.editEmployee(this.employeeId, payload).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Chỉnh sửa thành công' });
      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
      }
    })
  }

  convertToImg(stringBase: string): SafeUrl {
    const imageUrl = stringBase;
    return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
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
