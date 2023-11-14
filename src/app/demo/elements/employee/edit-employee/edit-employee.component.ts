import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,) { }

    dataForm = this.fb.group({
    id: new FormControl<string>('', [Validators.required]),
    fullName: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    avatar: new FormControl<string>(''),
    degree: new FormControl<string>('', [Validators.required]),
  });

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const employeeId = params.get('employeeId');
      console.log('employeeId', employeeId);

      // this.employeeService.getEmployeeById(employeeId).subscribe(employee => {
      //   this.employee = employee;
      // });
    });
  }

  protected editEmployee() {
    
  }

  protected handleUpload(event: any){
    if(event.target.files.length > 0) 
     {
       this.dataForm.patchValue({
        avatar: event.target.files[0],
       })
     }
  }

}
