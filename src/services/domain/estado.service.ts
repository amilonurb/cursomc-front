import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs/Rx';

import { EstadoDTO } from './../../models/estado.dto';
import { API_CONFIG as api } from '../../config/api.config';

@Injectable()
export class EstadoService {

    constructor(public httpClient: HttpClient) { }

    findAll(): Observable<EstadoDTO[]> {
        return this.httpClient.get<EstadoDTO[]>(`${api.baseURL}/estados`);
    }
}
