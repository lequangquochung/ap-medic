import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LabService } from 'src/app/services/lab-service/lab-service.service';

@Component({
  selector: 'app-create-service',
  styleUrls: ['create-service.component.scss'],
  templateUrl: './create-service.component.html',
  providers: [MessageService]
})
export class CreateServiceComponent implements OnInit {

  labServicetForm: FormGroup;
  imgPayload: any;
  imageSrc: any;
  titlePayload: string;
  serviceIndex: number;
  orderTitle: number;

  constructor(private fb: FormBuilder,
    private labService: LabService) {

  }

  ngOnInit(): void {
    this.getLabServices();
  }

  submitForm() {
    const payload = {
      title: this.titlePayload,
      order: this.serviceIndex,
    }
    this.labService.createMainService(payload).subscribe({
      next:(res) =>{
        this.getLabServices();
      }
    })
  }

  getLabServices() {
    this.labService.getListLabService().subscribe({
      next: (res) => {
        this.serviceIndex = res.data.length + 1;
      }
    })
  }

  protected getDefaultAvatar(e: Event) {
    const imgElement = e.target as HTMLImageElement;
    imgElement.src = 'assets/images/user/default-avatar.png';
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
}
