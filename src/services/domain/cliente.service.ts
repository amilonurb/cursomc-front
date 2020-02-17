import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { API_CONFIG as api } from './../../config/api.config';
import { ClienteDTO } from './../../models/cliente.dto';
import { ImageUtilService } from './../image-util.service';
import { StorageService } from './../storage.service';
import { text } from "@angular/core/src/render3/instructions";

@Injectable()
export class ClienteService {

    constructor(
        public httpClient: HttpClient,
        public storageService: StorageService,
        public imageUtilService: ImageUtilService) { }

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

    uploadPicture(picture) {
        const pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        const formData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.httpClient.post(
            `${api.baseURL}/clientes/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
