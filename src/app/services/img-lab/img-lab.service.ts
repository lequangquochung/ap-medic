import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { createRequestOptions } from "src/app/helpers/RequestOptions";
import { IResponseData } from "src/app/models/response-data.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class    ImgLabService {
    constructor(private httpClient: HttpClient) {
    }
    private baseUrl = `${environment.apiUrl}`

    // create(payload: any)
    create(payload: any): Observable<IResponseData<any>> {
        return this.httpClient.post<any>(this.baseUrl + 'cms/lab-image', payload);
    }

    getAll(): Observable<IResponseData<any>> {
        return this.httpClient.get<any>(this.baseUrl + 'cms/lab-image');
    }

    delete(id: string):Observable<IResponseData<any>> {
        return this.httpClient.delete<any>(`${this.baseUrl}cms/lab-image/${id}`);
    }
}