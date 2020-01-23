import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";

import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Teste para saber se a requisição é para a api ou para o bucket
        const localUser = this.storageService.getLocalUser();
        const length = API_CONFIG.baseURL.length;
        const requestToApi = req.url.substring(0, length) == API_CONFIG.baseURL;

        if (localUser && requestToApi) {
            const authRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${localUser.token}`)
            });

            return next.handle(authRequest);
        }

        return next.handle(req)
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};
