import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService) { }

  imageSrc: any;
  imgPayload: any;
  employee?: any;
  employeeId?: string;
  baseDomain: string = environment.apiUrl;
  dataForm = this.fb.group({
    fullName: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    avatar: ['', Validators.required],
    degree: new FormControl<string>('', [Validators.required]),
  });

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
        this.imageSrc = this.baseDomain + res.data.avatar;
      }
    });
  }

  protected editEmployee() {
    if (this.dataForm.valid) {
      if (this.imgPayload) {
        const payload = {
          fullName: this.dataForm.get('fullName').value,
          description: this.dataForm.get('description').value,
          degree: this.dataForm.get('degree').value,
          avatar: ""
        }
        this.employeeService.uploadAvatar(this.imgPayload[0]).subscribe({
          next: (res) => {
            this.imageSrc = this.baseDomain + res.data;
            payload.avatar = res.data;
            this.editPayload(payload);
          }
        })
      } else {
        const payloadNonAvatar = {
          fullName: this.dataForm.get('fullName').value,
          description: this.dataForm.get('description').value,
          degree: this.dataForm.get('degree').value,
          avatar: this.dataForm.get('avatar').value
        }
        this.editPayload(payloadNonAvatar);
      }


    } else {
      console.log('invalid');
    }
  }

  editPayload(payload: any) {
    this.employeeService.editEmployee(this.employeeId, payload).subscribe({
      next: (res) => {
        ///ANCHOR - add toast
        // console.log('edit', res);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  protected readURL(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.imgPayload = event.srcElement.files;
      let reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result;
        };
      }
    }
  }

  protected getDefaultAvatar(e: Event) {
    const imgElement = e.target as HTMLImageElement;
    imgElement.src = 'assets/images/user/default-avatar.png';
  }

}
