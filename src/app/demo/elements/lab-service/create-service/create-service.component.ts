import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorPickerService } from 'ngx-color-picker';
import { MessageService } from 'primeng/api';
import { LabService } from 'src/app/services/lab-service/lab-service.service';

@Component({
  selector: 'app-create-service',
  styleUrls: ['create-service.component.scss'],
  templateUrl: './create-service.component.html',
  providers: [MessageService]
})
export class CreateServiceComponent implements OnInit {

  imgPayload: any;
  imageSrc: any;
  titlePayload: string;
  serviceIndex: number;
  orderTitle: number;
  selected?: string;
  presetValues: string[] = [];

  public colorList = [
    { key: "flame", value: "#e45a33", friendlyName: "Flame" },
    { key: "orange", value: "#fa761e", friendlyName: "Orange" },
    { key: "infrared", value: "#ef486e", friendlyName: "Infrared" },
    { key: "male", value: "#4488ff", friendlyName: "Male Color" },
    { key: "female", value: "#ff44aa", friendlyName: "Female Color" },
    { key: "paleyellow", value: "#ffd165", friendlyName: "Pale Yellow" },
    { key: "gargoylegas", value: "#fde84e", friendlyName: "Gargoyle Gas" },
    { key: "androidgreen", value: "#9ac53e", friendlyName: "Android Green" },
    { key: "carribeangreen", value: "#05d59e", friendlyName: "Carribean Green" },
    { key: "bluejeans", value: "#5bbfea", friendlyName: "Blue Jeans" },
    { key: "cyancornflower", value: "#1089b1", friendlyName: "Cyan Cornflower" },
    { key: "warmblack", value: "#06394a", friendlyName: "Warm Black" },
  ];


  constructor(
    private messageService: MessageService,
    private labService: LabService) {
    this.presetValues = this.getColorValues();
  }

  ngOnInit(): void {
    this.getLabServices();
  }

  getColor(event: any) {
    this.selected = event;
  }

  getColorValues() {
    return this.colorList.map(c => c.value);
  }


  submitForm() {
    const payload = {
      title: this.titlePayload,
      order: this.serviceIndex,
      bgColor: this.selected
    }

    this.labService.createMainService(payload).subscribe({
      next: (res) => {
        this.getLabServices();
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tạo thành công' });
          this.titlePayload = "";
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
        }
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
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
