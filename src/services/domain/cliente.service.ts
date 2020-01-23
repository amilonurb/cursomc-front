import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

import { StorageService } from './../storage.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { API_CONFIG as api } from './../../config/api.config';

@Injectable()
export class ClienteService {

    constructor(public httpClient: HttpClient, public storageService: StorageService) { }

    findByEmail(email: string): Observable<ClienteDTO> {
        return this.httpClient.get<ClienteDTO>(`${api.baseURL}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string) {
        const url = `${api.bucketBaseURL}/cp${id}.jpg`;
        return this.httpClient.get(url, { responseType: 'blob' });
    }

    insert(cliente: ClienteDTO) {
        return this.httpClient.post(
            `${api.baseURL}/clientes`,
            cliente,
            {
                observe: 'response',
                responseType: 'text'
            });
    }
}
