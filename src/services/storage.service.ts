import { Injectable } from '@angular/core';

import { LocalUser } from './../models/local-user';
import { STORAGE_KEYS } from './../config/storage-keys.config';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);

        if (!user) {
            return null;
        }

        return JSON.parse(user);
    }

    setLocalUser(localUser: LocalUser) {
        if (localUser == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
        }
    }
}