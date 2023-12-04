import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee/employee-service';
import { TechNewsService } from 'src/app/services/tech-news/tech.news-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-create-tech-news',
    styleUrls: ['create-tech-news.component.scss'],
    templateUrl: './create-tech-news.component.html',
    providers: [MessageService]
})
export class CreateTechNewsComponent implements OnInit {
    baseDomain: string = environment.apiUrl;
    contentForm: FormGroup;
    imageSrc: any;
    imgPayload: File;
    htmlContent: any = "";
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '30rem',
        minHeight: '15rem',
        placeholder: 'Nhập nội dung bài viết',
        translate: 'no',
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',

        toolbarHiddenButtons: [
            ['bold']
        ],
        customClasses: [
            {
                name: "quote",
                class: "quote",
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: "titleText",
                class: "titleText",
                tag: "h1",
            },
        ]
    };
    fileData: any;

    constructor(private fb: FormBuilder,
        private messageService: MessageService,
        private techNewsService: TechNewsService,
        private employeeService: EmployeeService,
    ) {
        this.contentForm = this.fb.group({
            title: ['', Validators.required],
            subContent: ['', Validators.required],
            content: ['', Validators.required]
        })
    }
    ngOnInit(): void { }

    submitForm() {
        this.createContent();
    }

    createContent() {
        const payload = {
            title: this.contentForm.controls['title'].value,
            subContent: this.contentForm.controls['subContent'].value,
            content: this.contentForm.controls['content'].value,
            thumbnail: this.fileData
        }

        this.techNewsService.createContent(payload).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tạo bài viết thành công' });
            },
            error() {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
            }
        })
    }


    protected getDefaultAvatar(e: Event) {
        const imgElement = e.target as HTMLImageElement;
        imgElement.src = 'assets/images/user/default-avatar.png';
    }

    protected handleUpload(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.fileData = reader.result
        };
    }

    // protected readURL(event: any): void {
    //     if (event.target.files && event.target.files.length > 0) {
    //         this.imgPayload = event.srcElement.files;
    //         let reader = new FileReader();
    //         if (event.target.files && event.target.files.length > 0) {
    //             let file = event.target.files[0];
    //             reader.readAsDataURL(file);
    //             reader.onload = () => {
    //                 this.imageSrc = reader.result;
    //             };
    //         }
    //     }
    // }

}
