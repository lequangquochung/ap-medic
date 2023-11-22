import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultAvatar } from 'src/app/helpers/default-avatar';
import { IEmployeeCreate } from 'src/app/models/IEmployeee';
import { EmployeeService } from 'src/app/services/employee/employee-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  employees?: IEmployeeCreate[];
  baseDomain: string = environment.apiUrl;

  data: IEmployeeCreate[] = [
    { id: '1', fullName: 'Andrew ', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
    { id: '2', fullName: ' Owen', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
    { id: '3', fullName: 'Hung ', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
    { id: '4', fullName: 'Andrew Owen', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
    { id: '5', fullName: 'Andrew Owen', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
    { id: '6', fullName: 'Andrew Owen', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
  ]

  constructor(private router: Router,
    private employeeService: EmployeeService) { }

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
          this.employees.map((item: any)=> {
            console.log(item);
            item.avatar = this.baseDomain + item.avatar;
          })
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  protected onDelete(id: string) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (res) =>{
        if(res.success) {
          this.getEmployees()
        }
      }
    })
  }

  protected getDefaultAvatar(e: Event) {
    const imgElement = e.target as HTMLImageElement;
    imgElement.src = 'assets/images/user/default-avatar.png';
  }

  onImageError(entity: any):void {
    entity.imageUrl = 'some-image.svg'
}
}
