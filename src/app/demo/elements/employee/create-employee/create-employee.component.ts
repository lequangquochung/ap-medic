import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeServiceService } from 'src/app/services/employee/employee-service.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent {
  createForm = this.fb.group({
    fullName: new FormControl<string>('', [Validators.required]),
    description:  new FormControl<string>(''),
    avatar: new FormControl<string>(''),
    degree:  new FormControl<string>('', [Validators.required]),
  });
  
  constructor(
    private fb: FormBuilder,
    private employeeServiceService: EmployeeServiceService
  ) { }

  protected createEmployee() {
    console.log(this.createForm.value);
    
  }

  protected handleUpload(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
    };
  }
}
