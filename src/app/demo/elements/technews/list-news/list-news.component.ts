import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/models/INews';
import { TechNewsService } from 'src/app/services/tech-news/tech.news-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-news',
  styleUrls: ['list-news.component.scss'],
  templateUrl: './list-news.component.html',
})
export class ListNewsComponent implements OnInit {
  baseDomain: string = environment.apiUrl;
  data?: INews[];
  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor( private techNewsService: TechNewsService) {

  }
  ngOnInit(): void {
    this.getListNews();
  }

  getListNews() {
    this.techNewsService.getListNews().subscribe({
      next: (res)=> {
        if(res.success) {
          this.loading = false;
          this.data = res.data.map((item:INews) => {
            item.thumbnail = this.baseDomain + item.thumbnail;
            return item;
          })
          console.log(this.data);
        }
      }
    })
  }

  protected getDefaultAvatar(e: Event) {
    const imgElement = e.target as HTMLImageElement;
    imgElement.src = 'assets/images/user/default-avatar.png';
  }
}
