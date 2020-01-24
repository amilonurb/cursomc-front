import { CartService } from './domain/cart.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';

import { API_CONFIG as api } from './../config/api.config';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { LocalUser } from './../models/local-user';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        public httpClient: HttpClient,
        public storageService: StorageService,
        public cartService: CartService) { }

    authenticate(credenciais: CredenciaisDTO) {
        return this.httpClient.post(
            `${api.baseURL}/auth/login`,
            credenciais,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    refreshToken() {
        return this.httpClient.post(
            `${api.baseURL}/auth/refresh_token`,
            {},
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    successfulLogin(authorization: string) {
        let token = authorization.substring(7);

        let user: LocalUser = {
            token,
            email: this.jwtHelper.decodeToken(token).sub
        }

        this.storageService.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout() {
        this.storageService.setLocalUser(null);
    }
}
