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
        this.accessToken = this.adminService.accessToken
    }

    private baseUrl = `${environment.apiUrl}`

    createEmployee(payload: any): Observable<IResponseData<any>> {
        return this.httpClient.post<any>(this.baseUrl + 'cms/employee', payload)
    }

    getEmployees(): Observable<any> {

        return this.httpClient.get<any>(this.baseUrl + `cms/employee`);
    }

    getEmployeeById(id: string): Observable<any> {
      
        return this.httpClient.get<any>(this.baseUrl + `cms/employee/${id}`);
    }

    editEmployee(id: string, payload: any): Observable<any> {
        return this.httpClient.put<any>(this.baseUrl + `cms/employee/${id}`, payload);
    }

    deleteEmployee(id: string): Observable<any> {
        return this.httpClient.delete<any>(this.baseUrl + `cms/employee/${id}`);
    }

}
