import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

import { API_CONFIG as api } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public httpClient: HttpClient) { }

    findById(produto_id: string) {
        return this.httpClient.get<ProdutoDTO>(`${api.baseURL}/produtos/${produto_id}`);
    }

    findByCategoria(categoria_id: string) {
        return this.httpClient.get(`${api.baseURL}/produtos?categorias=${categoria_id}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        const url = `${api.bucketBaseURL}/prod${id}.jpg`;
        return this.httpClient.get(url, { responseType: 'blob' });
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        const url = `${api.bucketBaseURL}/prod${id}-small.jpg`;
        return this.httpClient.get(url, { responseType: 'blob' });
    }
}