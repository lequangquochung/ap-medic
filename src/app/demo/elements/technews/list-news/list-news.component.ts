import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { INews } from 'src/app/models/INews';
import { TechNewsService } from 'src/app/services/tech-news/tech.news-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-list-news',
    styleUrls: ['list-news.component.scss'],
    templateUrl: './list-news.component.html',
    providers: [MessageService, ConfirmationService]

})
export class ListNewsComponent implements OnInit {
    baseDomain: string = environment.apiUrl;
    data?: INews[];
    loading: boolean = true;

    totalRecords: number = 0;
    rows: number = 10;

    activityValues: number[] = [0, 100];

    constructor(private router: Router,
        private confirmationService: ConfirmationService,
        private techNewsService: TechNewsService,
        private messageService: MessageService,
        private _sanitizer: DomSanitizer
        ) {

    }
    ngOnInit(): void {
        this.getListNews();
    }

    onEdit(id: string): void {
        this.router.navigate([`/app/news/${id}/edit`]);
    }

    getListNews() {
        this.techNewsService.getListNews().subscribe({
            next: (res) => {
                if (res.success) {
                    this.loading = false;
                    this.totalRecords = res.totalItems;
                    this.data = res.data.map((item: any) => {
                        // item.thumbnail = this.baseDomain + item.thumbnail;
                        item.thumbnail = this.convertToImg(item.thumbnail);
                        return item;
                    })
                }
            }
        })
    }

    onDelete(id: string) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Xoá bài viết ?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteNews(id);
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
            }
        });
    }

    deleteNews(id: string) {
        this.techNewsService.delete(id).subscribe({
            next: (res) => {
                if (res.success) {
                    this.getListNews();
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xoá bài viết thành công' });
                } else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
                }
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Không thành công' });
            }
        })
    }

    convertToImg(stringBase: string): SafeUrl {
        const imageUrl = stringBase;
        return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
    }

    protected getDefaultAvatar(e: Event) {
        const imgElement = e.target as HTMLImageElement;
        imgElement.src = 'assets/images/user/default-avatar.png';
    }
}
