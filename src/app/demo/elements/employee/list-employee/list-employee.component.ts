import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployeeCreate } from 'src/app/models/IEmployeee';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent {
  
  data: IEmployeeCreate[] = [
    { id: '1', fullName: 'Andrew ', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
    { id: '2', fullName: ' Owen', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
    { id: '3', fullName: 'Hung ', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
    { id: '4', fullName: 'Andrew Owen', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
    { id: '5', fullName: 'Andrew Owen', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
    { id: '6', fullName: 'Andrew Owen', description: 'Doctor Thanh', avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg', degree: 'Doctor' },
  ]

  constructor(private router: Router){}

  protected onEdit(employeeId: string): void {
    console.log(employeeId);
    
    this.router.navigate([`/employee/${employeeId}/edit`]);
  }

}
