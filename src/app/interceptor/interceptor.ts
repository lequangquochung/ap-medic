import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, tap, throwError, timer } from "rxjs";
import { AdminService } from "../services/admin/admin-service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(
        private authService: AdminService,
        private router: Router,
        // private toastService: ToastService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.authService.accessToken;
        if (accessToken) {
            request = request.clone({
                headers: request.headers.append('Authorization', 'Bearer ' + accessToken).append('Access-Control-Allow-Origin', '*'),
            });
        }

        return next.handle(request).pipe(
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    // Token expired, try to refresh the token
                    return this.handleTokenExpiration(request, next);
                }
                return throwError(error);
            })
        );
    }

    private handleTokenExpiration(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return timer(500).pipe(switchMap(() => {
            const refeshToken = this.authService._refreshToken;
            if (!this.isRefreshing) {
                this.isRefreshing = true;
                this.refreshTokenSubject.next(null);

                return this.authService.refreshToken(refeshToken).pipe(
                    switchMap((newToken: any) => {
                        this.isRefreshing = false;
                        this.refreshTokenSubject.next(newToken);
                        return next.handle(this.addToken(request, newToken.data.accessToken));
                    }),
                    catchError((error: any) => {
                        this.isRefreshing = false;
                        this.authService.logout(); // Example: Logout the user
                        return throwError(error);
                    })
                );
            } else {
                // If another request is already refreshing the token, wait for it to complete and then retry
                return this.waitForTokenRefresh().pipe(
                    switchMap((newToken: string) => {
                        return next.handle(this.addToken(request, newToken));
                    })
                );
            }
        }));
    }

    private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
        this.authService.setAccessToken(token);
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private waitForTokenRefresh(): Observable<any> {
        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1)
        );
    }
}