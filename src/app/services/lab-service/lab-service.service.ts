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

  constructor(private httpClient: HttpClient) {
  }
  private baseUrl = `${environment.apiUrl}`

  getListLabService(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `cms/lab-service/`);
  }

  createMainService(payload: any): Observable<IResponseData<any>> {
    return this.httpClient.post<any>(this.baseUrl + 'cms/lab-service', payload)
  }

  getListServiceDetail(id: string): Observable<IResponseData<any>> {
    return this.httpClient.get<any>(this.baseUrl + `cms/lab-service/${id}`);
  }

  editService(id: string, payload: any ): Observable<IResponseData<any>>{
    return this.httpClient.put<any>(this.baseUrl + `cms/lab-service/${id}`, payload);
  }

 
}
  