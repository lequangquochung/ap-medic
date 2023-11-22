import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createRequestOptions } from 'src/app/helpers/RequestOptions';
import { IResponseData } from 'src/app/models/response-data.model';
import { environment } from 'src/environments/environment';
import { AdminService } from '../admin/admin-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  accessToken: string;
  constructor(private httpClient: HttpClient,
    private adminService: AdminService) { 
      this.accessToken  = this.adminService.accessToken
    }
  
  private baseUrl = `${environment.apiUrl}`

  uploadAvatar(file: File): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`,
      observe: 'response'
    });
    let formParams = new FormData();
    formParams.append('file', file)
    
    return this.httpClient.post<any>(this.baseUrl + 'cms/upload', formParams, {headers: headers},)
  }
  
  createEmployee(payload: any):  Observable<IResponseData<any>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    
    return this.httpClient.post<any>(this.baseUrl + 'cms/employee', payload, {headers: headers})
  }

  getEmployees(): Observable<any> {
    const options = createRequestOptions({
      params: { take: 999 },
      headers: { 'Authorization': `Bearer ${this.accessToken}`,
      'ngrok-skip-browser-warning': 'true' },
    });

    return this.httpClient.get<any>(this.baseUrl + `cms/employee`, options);
  }

  getEmployeeById(id: string) : Observable<any> {
    const options = createRequestOptions({
      headers: { 'Authorization': `Bearer ${this.accessToken}`,
      'ngrok-skip-browser-warning': 'true' },
    });
    return this.httpClient.get<any>(this.baseUrl + `cms/employee/${id}`, options);
  }

  editEmployee(id: string, payload: any): Observable<any> {
    const options = createRequestOptions({
      headers: { 'Authorization': `Bearer ${this.accessToken}`,
      'ngrok-skip-browser-warning': 'true' },
    
    });
    return this.httpClient.put<any>(this.baseUrl + `cms/employee/${id}`, payload, options);
  }

  deleteEmployee(id: string): Observable<any>{ 
    const options = createRequestOptions({
      headers: { 'Authorization': `Bearer ${this.accessToken}`,
      'ngrok-skip-browser-warning': 'true' },
    
    });
    return this.httpClient.delete<any>(this.baseUrl + `cms/employee/${id}`, options);
  }

}
