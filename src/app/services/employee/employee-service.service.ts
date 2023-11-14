import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseData } from 'src/app/models/response-data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private httpClient: HttpClient,) { }
  
  private baseUrl = `${environment.apiUrl}`
  
  createEmployee(payload: FormData):  Observable<IResponseData<any>> {
    return this.httpClient.post<any>(this.baseUrl + 'cms/employee', payload, )
  }

  getEmployees() {

  }


}
