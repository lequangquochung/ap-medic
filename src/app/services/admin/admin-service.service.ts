import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EStorageKey } from 'src/app/enum/storage-key.enum';
import { IResponseData } from 'src/app/models/response-data.model';
import { ILoginRequest } from 'src/app/models/ILoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private baseUrl = `${environment.apiUrl}`
  
  private currentUserChanged = new Subject<any>();

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  public get accessToken(): string | null {
    return localStorage.getItem(EStorageKey.AccessToken) ? (localStorage.getItem(EStorageKey.AccessToken) as string | null) : null;
  }

  public signIn(payload: ILoginRequest): Observable<IResponseData<any>> {
    return this.httpClient.post<any>(this.baseUrl + 'cms/auth/login', payload).pipe(
      map((result: IResponseData<any>) => {
        if (result.success) {
          localStorage.setItem(EStorageKey.AccessToken, result.data.accessToken);
          this.currentUserChanged.next(result);
          return result;
        }
        return result;
      })
    )
  }

  public logout(): void {
    localStorage.removeItem(EStorageKey.AccessToken);
    this.router.navigate(['login']);
  }
}
