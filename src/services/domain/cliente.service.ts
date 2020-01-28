import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG as api } from './../../config/api.config';
import { ClienteDTO } from './../../models/cliente.dto';
import { StorageService } from './../storage.service';


@Injectable()
export class ClienteService {

    constructor(public httpClient: HttpClient, public storageService: StorageService) { }

    findById(id: string) {
        return this.httpClient.get(`${api.baseURL}/clientes/${id}`);
    }

    findByEmail(email: string) {
        return this.httpClient.get(`${api.baseURL}/clientes/email?value=${email}`);
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
