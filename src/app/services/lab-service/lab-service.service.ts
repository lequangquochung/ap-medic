import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AdminService } from "../admin/admin-service";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { createRequestOptions } from "src/app/helpers/RequestOptions";
import { IResponseData } from "src/app/models/response-data.model";

@Injectable({
  providedIn: 'root'
})
export class LabService {
  accessToken: string;

  constructor(private httpClient: HttpClient,
    private adminService: AdminService) {
    this.accessToken = this.adminService.accessToken
  }
  private baseUrl = `${environment.apiUrl}`

  getListLabService(): Observable<any> {
    const options = createRequestOptions({
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'ngrok-skip-browser-warning': 'true'
      },
    });
    return this.httpClient.get<any>(this.baseUrl + `cms/lab-service/`, options);
  }

  createMainService(payload: any): Observable<IResponseData<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.httpClient.post<any>(this.baseUrl + 'cms/lab-service', payload, { headers: headers })
  }

 
}
  