import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs/Rx';

import { CidadeDTO } from "../../models/cidade.dto";
import { API_CONFIG as api } from '../../config/api.config';

@Injectable()
export class CidadeService {

    constructor(public httpClient: HttpClient) { }

    findAll(estado_id: string): Observable<CidadeDTO[]> {
        return this.httpClient.get<CidadeDTO[]>(`${api.baseURL}/estados/${estado_id}/cidades`);
    }
}
