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
export class AdminService {
    private baseUrl = `${environment.apiUrl}`

    public currentUserChanged = new Subject<any>();

    constructor(private httpClient: HttpClient,
        private router: Router) { }

    public get accessToken(): string | null {
        return localStorage.getItem(EStorageKey.AccessToken) ? (localStorage.getItem(EStorageKey.AccessToken) as string | null) : null;
    }

    public get _refreshToken(): string | null {
        return localStorage.getItem(EStorageKey.RefreshToken) ? (localStorage.getItem(EStorageKey.RefreshToken) as string | null) : null;
    }

    public isLoggedIn(): boolean {
        return this.currentUser !== null;
    }


    public get currentUser(): any | null {
        return localStorage.getItem(EStorageKey.AccessToken)
            ? localStorage.getItem(EStorageKey.AccessToken)
            : null;
    }


    public signIn(payload: ILoginRequest): Observable<IResponseData<any>> {
        return this.httpClient.post<any>('https://ap-lab-be-production.up.railway.app/cms/auth/login', payload).pipe(
            map((result: IResponseData<any>) => {
                if (result.success) {
                    localStorage.setItem(EStorageKey.AccessToken, result.data.accessToken);
                    localStorage.setItem(EStorageKey.RefreshToken, result.data.refreshToken);
                    this.currentUserChanged.next(result);
                    return result;
                }
                return result;
            })
        )
    }

    public refreshToken(token: string): Observable<Required<IResponseData<any>>> {
        return this.httpClient.post<Required<IResponseData<any>>>(this.baseUrl + 'cms/auth/request-access-token', {refreshToken: token});
    }

    public logout(): void {
        localStorage.removeItem(EStorageKey.AccessToken);
        this.router.navigate(['login']);
    }

    public setCurrentUser(currentUser: any) {
        localStorage.setItem(EStorageKey.CurrentUser, JSON.stringify(currentUser));
    }

    public setAccessToken(refreshToken: string) {
        localStorage.setItem(EStorageKey.AccessToken, refreshToken);
    }

    public setRefreshToken(refreshToken: string) {
        localStorage.setItem(EStorageKey.RefreshToken, refreshToken);
    }
}
