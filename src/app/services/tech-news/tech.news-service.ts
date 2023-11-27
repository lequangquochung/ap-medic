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
  accessToken: string;
  constructor(private httpClient: HttpClient,
    private adminService: AdminService) {
    this.accessToken = this.adminService.accessToken
  }
  private baseUrl = `${environment.apiUrl}`

  createContent(payload: any): Observable<IResponseData<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.httpClient.post<any>(this.baseUrl + 'cms/topic', payload, { headers: headers })
  }

  getListNews(): Observable<any> {
    const options = createRequestOptions({
      params: { take: '', skip: '' },
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'ngrok-skip-browser-warning': 'true'
      },
    });
    return this.httpClient.get<any>(this.baseUrl + `cms/topic`, options);
  }

  edit(id: string, payload): Observable<any> {
    const options = createRequestOptions({
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'ngrok-skip-browser-warning': 'true'
      },

    });
    return this.httpClient.put<any>(this.baseUrl + `cms/topic/${id}`, payload, options);
  }

  getNewsById(id: string): Observable<any> {
    const options = createRequestOptions({
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'ngrok-skip-browser-warning': 'true'
      },
    });
    return this.httpClient.get<any>(this.baseUrl + `cms/topic/${id}`, options);
  }

  delete(id: string): Observable<any> {
    const options = createRequestOptions({
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'ngrok-skip-browser-warning': 'true'
      },
    });
    return this.httpClient.delete<any>(this.baseUrl + `cms/topic/${id}`, options);
  }
}