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

    findByCategoria(categoria_id: string, page: number = 0, linesPerPage: number = 0) {
        const url = `${api.baseURL}/produtos?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`;
        return this.httpClient.get(url);
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
