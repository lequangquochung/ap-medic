import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MessageService } from 'primeng/api';
import { TechNewsService } from 'src/app/services/tech-news/tech.news-service';

@Component({
    selector: 'app-create-tech-news',
    styleUrls: ['create-tech-news.component.scss'],
    templateUrl: './create-tech-news.component.html',
    providers: [MessageService]
})
export class CreateTechNewsComponent implements OnInit {
    @ViewChild('myInputFile')
    myInputVariable?: ElementRef;
    contentForm: FormGroup;
    imageSrc: any;
    imgPayload: File;
    htmlContent: any = "";
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '100%',
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
    defaultSrcImg: string = 'assets/images/user/default-avatar.png';
    defaultImgData: any;

    constructor(private fb: FormBuilder,
        private messageService: MessageService,
        private techNewsService: TechNewsService,
        private http: HttpClient
    ) {
        this.contentForm = this.fb.group({
            title: ['', Validators.required],
            subContent: ['', Validators.required],
            content: ['', Validators.required]
        })
    }
    ngOnInit(): void {
        this.getFileDefault();
    }

    submitForm() {
        this.createContent();
    }

    createContent() {
        const payload = {
            title: this.contentForm.controls['title'].value,
            subContent: this.contentForm.controls['subContent'].value,
            content: this.contentForm.controls['content'].value,
            thumbnail: this.fileData ? this.fileData : this.defaultImgData
        }
        
        if (this.contentForm.valid) {
            this.techNewsService.createContent(payload).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tạo bài viết thành công' });
                    this.contentForm?.reset();
                    this.myInputVariable.nativeElement.value = "";
                },
                error() {
                    this.contentForm?.reset();
                    this.myInputVariable!.nativeElement.value = "";
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
                }
            })
        }
    }

    protected getDefaultAvatar(e: Event) {
        const imgElement = e.target as HTMLImageElement;
        imgElement.src = this.defaultSrcImg;
    }

    protected handleUpload(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.fileData = reader.result
        };
    }

    getFileDefault() {
        this.http.get(this.defaultSrcImg, { responseType: 'arraybuffer' }).subscribe(
            (data) => {
                this.defaultImgData = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
            },
            (error) => {
                console.error('Error fetching file:', error);
            }
        );
    }

   
}
