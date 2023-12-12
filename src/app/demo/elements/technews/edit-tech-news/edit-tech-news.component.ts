import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee/employee-service';
import { TechNewsService } from 'src/app/services/tech-news/tech.news-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-edit-tech-news',
    styleUrls: ['edit-tech-news.component.scss'],
    templateUrl: './edit-tech-news.component.html',
    providers: [MessageService]
})
export class EditTechNewsComponent implements OnInit {
    baseDomain: string = environment.apiUrl;
    contentForm: FormGroup;
    newsId: string;
    imageSrc: any;
    imgPayload: File;
    htmlContent: any = "";
    fileData: any;
    imageForm: any;
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

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private techNewsService: TechNewsService,
        private messageService: MessageService,
        private _sanitizer: DomSanitizer,
        private employeeService: EmployeeService) {
        this.contentForm = this.fb.group({
            title: ['', Validators.required],
            subContent: ['', Validators.required],
            content: ['', Validators.required],
            thumbnail: ['', Validators.required]
        });
        this.route.paramMap.subscribe(params => {
            const newsId = params.get('newsId');
            this.newsId = newsId;
        });
    }
    ngOnInit(): void {
        this.loadDataEdit();
    }

    onEdit() {
        if (this.contentForm.valid) {
            const payload = {
                title: this.contentForm.get('title').value,
                subContent: this.contentForm.get('subContent').value,
                content: this.contentForm.get('content').value,
                thumbnail:this.contentForm.get('thumbnail').value,
            }
            this.editPayload(payload);
            
            // if (this.imgPayload) {
            //     this.employeeService.uploadAvatar(this.imgPayload[0]).subscribe({
            //         next: (res) => {
            //             this.imageSrc = this.baseDomain + res.data;
            //             this.imgPayload = res.data;
            //             this.editPayload(payload);
            //         },
            //         error(e: Error) {
            //             console.log('error', e);
            //             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
            //         }
            //     });
            // } else {
            //     const payload = {
            //         title: this.contentForm.get('title').value,
            //         subContent: this.contentForm.get('subContent').value,
            //         content: this.contentForm.get('content').value,
            //         thumbnail:  this.contentForm.get('thumbnail').value,
            //     }
            //     
            // }
        }
    }

    editPayload(payload: any) {
        this.techNewsService.edit(this.newsId, payload).subscribe({
            next: () => {
                this
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sửa bài viết thành công' });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
            }
        })
    }

    loadDataEdit() {
        this.techNewsService.getNewsById(this.newsId).subscribe({
            next: (res) => {
                this.contentForm.patchValue(res.data);
                this.imageForm =res.data.thumbnail;
                this.fileData = this.convertToImg(res.data.thumbnail);
            }
        })
    }

    protected readURL(event: any): void {
        if (event.target.files && event.target.files.length > 0) {
            this.imageForm = event.srcElement.files;
            let reader = new FileReader();
            if (event.target.files && event.target.files.length > 0) {
                let file = event.target.files[0];
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.imageForm = reader.result;
                };
            }
        }
    }

    protected getDefaultAvatar(e: Event) {
        const imgElement = e.target as HTMLImageElement;
        imgElement.src = 'assets/images/user/default-avatar.png';
    }

    convertToImg(stringBase: string): SafeUrl {
        const imageUrl = stringBase;
        return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
      }
}
