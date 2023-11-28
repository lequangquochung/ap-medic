import { Component, OnInit } from '@angular/core';
import { LabService } from 'src/app/services/lab-service/lab-service.service';

@Component({
  selector: 'app-list-service',
  styleUrls: ['list-service.component.scss'],
  templateUrl: './list-service.component.html',
})
export class ListServiceComponent implements OnInit {

  data: any;

  constructor( private labService: LabService) {

  }
  ngOnInit(): void {
    this.getListLabService();
  }


  getListLabService() {
    this.labService.getListLabService().subscribe({
      next:(res) => {
        if (res.success) {
          this.data = res.data;
          console.log(this.data);
          
        }
      } 
    }) 
  }
}
