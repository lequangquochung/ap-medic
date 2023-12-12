import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabService } from 'src/app/services/lab-service/lab-service.service';

@Component({
  selector: 'app-list-service',
  styleUrls: ['list-service.component.scss'],
  templateUrl: './list-service.component.html',
})
export class ListServiceComponent implements OnInit {

  data: any;

  constructor( private labService: LabService,
    private router: Router,) {

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
  
  onEdit(id: string) {
    this.router.navigate([`/app/lab-service/${id}/edit-service`]);
  }
}

