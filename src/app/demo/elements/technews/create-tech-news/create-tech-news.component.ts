import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EmployeeService } from 'src/app/services/employee/employee-service';
import { TechNewsService } from 'src/app/services/tech-news/tech.news-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-tech-news',
  styleUrls:['create-tech-news.component.scss'],
  templateUrl: './create-tech-news.component.html',
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

  constructor(private fb: FormBuilder,
    private techNewsService: TechNewsService, 
    private employeeService: EmployeeService ) {
    this.contentForm = this.fb.group({
      title: ['', Validators.required],
      subContent: ['', Validators.required],
      content: ['', Validators.required]
    })
  }
  ngOnInit(): void {}

  submitForm() {
    // if(this.contentForm.valid) {
      
      this.employeeService.uploadAvatar(this.imgPayload[0]).subscribe({
        next: (res) => {
          this.imageSrc =  this.baseDomain + res.data;
          this.imgPayload = res.data;
          this.createContent();
        }
      });
    
  }

  createContent() {
    const payload = {
      title: this.contentForm.controls['title'].value,
      subContent:  this.contentForm.controls['subContent'].value,
      content:  this.contentForm.controls['content'].value,
      thumbnail: this.imgPayload

    }
    console.log('payload', payload);
    
    this.techNewsService.createContent(payload).subscribe({
      next: (res) => {
        console.log('content', res);
        
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
      console.log(this.imgPayload);
      
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
