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
    });
    lastIndex = 0;
    formArrays = [];
    isValidFormArray: boolean = false;

    // items: FormArray = new FormArray([]);

    constructor(private route: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private labService: LabService) {
        this.route.paramMap.subscribe(params => {
            const serviceId = params.get('serviceId');
            this.serviceId = serviceId;
        });
        // this.details = this.submitForm.get('details') as FormArray;
    }
    ngOnInit(): void {
        this.getListServiceDetail(this.serviceId);
    }

    getListServiceDetail(id: string) {
        this.labService.getListServiceDetail(id).subscribe({
            next: (res: any) => {
                this.detailData = res.data;
                this.submitForm.patchValue(this.detailData)
                this.lastIndex = this.detailData.details.length;
                console.log('lastIndex', this.lastIndex);

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
        let checkValid = true;
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Cập nhật dịch vụ ?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const valueData:any = {
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
