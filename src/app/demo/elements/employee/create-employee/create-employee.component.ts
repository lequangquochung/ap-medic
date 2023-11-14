import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeServiceService } from 'src/app/services/employee/employee-service.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit{
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
  ngOnInit(): void {
    console.log("hello");
    
    
  }

  protected createEmployee() {
    console.log(this.createForm.value, this.createForm.get('fullName').value)
    let formData = new FormData();
    formData.append('fullName', this.createForm.get('fullName').value);
    formData.append('description',this.createForm.get('description').value);
    formData.append('avatar',this.createForm.get('avatar').value);
    formData.append('degree',this.createForm.get('degree').getRawValue());

    
    this.employeeServiceService.createEmployee(formData).subscribe({
      next:(res) => {
        console.log(res);
        
      },
      error: (e) => {
        console.log(e);
        
      }
    });
  }

  protected handleUpload(event: any){
    if(event.target.files.length > 0) 
     {
       this.createForm.patchValue({
        avatar: event.target.files[0],
       })
     }
  }
}
