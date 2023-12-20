import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabService } from 'src/app/services/lab-service/lab-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-edit-service',
    styleUrls: ['edit-service.component.scss'],
    templateUrl: './edit-service.component.html',
    providers: [MessageService, ConfirmationService]
})
export class EditServiceComponent implements OnInit {

    serviceId: string = '';
    detailData: any;
    details: FormArray
    submitForm = this.fb.group({
        title: [''],
        order: [''],
        bgColor: ['']
    });
    lastIndex = 0;
    formArrays = [];
    isValidFormArray: boolean = false;
    presetValues: string[] = [];

    bgColor?: string;
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

    constructor(private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private labService: LabService) {
        this.route.paramMap.subscribe(params => {
            const serviceId = params.get('serviceId');
            this.serviceId = serviceId;
        });
        this.presetValues = this.getColorValues();
    }
    ngOnInit(): void {
        this.getListServiceDetail(this.serviceId);
    }

    getColor(event: any) {
        this.submitForm.get('bgColor').setValue(event);
    }

    getColorValues() {
        return this.colorList.map(c => c.value);
    }

    getListServiceDetail(id: string) {
        this.labService.getListServiceDetail(id).subscribe({
            next: (res: any) => {
                this.detailData = res.data;
                this.bgColor = this.detailData.bgColor;
                this.submitForm.patchValue(this.detailData)
                this.lastIndex = this.detailData.details.length;

                this.detailData.details.forEach(element => {
                    this.formArrays.push(this.fb.group({
                        content: [element?.content ?? "", Validators.required],
                        order: [element?.order]
                    }))
                });
            }
        })
    }

    addService() {
        this.formArrays.push(this.fb.group({
            content: ['', Validators.required],
            order: [this.lastIndex + 1]
        }))
    }

    createItem(): FormGroup {
        return this.fb.group({
            content: '',
        });
    }

    onSubmit(valueData: any) {
        if (this.submitForm.value) {
            const payload = valueData
            this.labService.editService(this.serviceId, payload).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cập nhật thành công' });
                    }
                },
                error: (e) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
                }
            })
        }
    }

    deleteItem(index: any) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Xoá mục này ?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.formArrays.splice(index, 1);
            }
        });
    }
    checkInValid(text: string): boolean {
        if (text) {
            return true;
        }
        return false;
    }

    saveItems() {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Cập nhật dịch vụ ?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const valueData: any = {
                    ...this.submitForm.getRawValue(),
                    details: this.formArrays.map(i => {
                        if (!i.getRawValue().content) {
                            return false;
                        } else {
                            return i.getRawValue();
                        }
                    })
                }

                let x = Object.values(valueData)[Object.values(valueData).length - 1] as any;
                const checkValid = x.some(element => element === false);

                if (!checkValid) {
                    this.onSubmit(valueData);
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
                }
            }
        });


    }
}
