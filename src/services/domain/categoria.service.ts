import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs/Rx';

import { CategoriaDTO } from './../../models/categoria.dto';

import { API_CONFIG as api } from '../../config/api.config';

@Injectable()
export class CategoriaService {

    constructor(public httpClient: HttpClient) { }

    findAll(): Observable<CategoriaDTO[]> {
        return this.httpClient.get<CategoriaDTO[]>(`${api.baseURL}/categorias`);
    }
}
