import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PedidoDTO } from "../../models/pedido.dto";
import { API_CONFIG as api } from "../../config/api.config";

@Injectable()
export class PedidoService {

    constructor(public httpClient: HttpClient) { }

    insert(pedido: PedidoDTO) {
        return this.httpClient.post(
            `${api.baseURL}/pedidos`,
            pedido,
            {
                observe: "response",
                responseType: "text"
            }
        );
    }
}
