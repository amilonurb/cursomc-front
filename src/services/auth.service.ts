import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { JwtHelper } from 'angular2-jwt';

import { StorageService } from './storage.service';
import { LocalUser } from './../models/local-user';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { API_CONFIG as api } from './../config/api.config';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper;

    constructor(
        public httpClient: HttpClient,
        public storageService: StorageService) { }

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
    }

    logout() {
        this.storageService.setLocalUser(null);
    }
}
