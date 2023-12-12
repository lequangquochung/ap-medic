import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AdminService } from "../admin/admin-service";
import { IResponseData } from "src/app/models/response-data.model";
import { Observable } from "rxjs";
import { createRequestOptions } from "src/app/helpers/RequestOptions";

@Injectable({
  providedIn: 'root'
})
export class TechNewsService {
  constructor(private httpClient: HttpClient,
    private adminService: AdminService) {
  }
  private baseUrl = `${environment.apiUrl}`

  createContent(payload: any): Observable<IResponseData<any>> {
    return this.httpClient.post<any>(this.baseUrl + 'cms/topic', payload)
  }

  getListNews(): Observable<any> {
    const options = createRequestOptions({
      params: { take: '999', skip: '' },
    });
    return this.httpClient.get<any>(this.baseUrl + `cms/topic`, options);
  }

  edit(id: string, payload): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + `cms/topic/${id}`, payload);
  }

  getNewsById(id: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `cms/topic/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrl + `cms/topic/${id}`);
  }
}