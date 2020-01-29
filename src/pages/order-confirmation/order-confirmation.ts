import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PedidoDTO } from '../../models/pedido.dto';
import { PedidoService } from '../../services/domain/pedido.service';
import { CartItem } from './../../models/cart-item';
import { ClienteDTO } from './../../models/cliente.dto';
import { EnderecoDTO } from './../../models/endereco.dto';
import { CartService } from './../../services/domain/cart.service';
import { ClienteService } from './../../services/domain/cliente.service';

@IonicPage()
@Component({
    selector: 'page-order-confirmation',
    templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

    pedido: PedidoDTO;
    cartItems: CartItem[];
    cliente: ClienteDTO;
    endereco: EnderecoDTO;
    pedido_id: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public cartService: CartService,
        public clienteService: ClienteService,
        public pedidoService: PedidoService) {

        this.pedido = this.navParams.get('pedido');
    }

    ionViewDidLoad() {
        this.cartItems = this.cartService.getCart().items;

        this.clienteService
            .findById(this.pedido.cliente.id)
            .subscribe(
                response => {
                    this.cliente = response as ClienteDTO;
                    this.endereco = this.findEndereco(this.pedido.enderecoEntrega.id, response['enderecos']);
                },
                error => {
                    this.navCtrl.setRoot('HomePage');
                }
            );
    }

    findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
        const position = list.findIndex(e => e.id == id);
        return list[position];
    }

    total() {
        return this.cartService.total();
    }

    back() {
        this.navCtrl.setRoot('CartPage');
    }

    home() {
        this.navCtrl.setRoot('CategoriasPage');
    }

    checkout() {
        this.pedidoService
            .insert(this.pedido)
            .subscribe(
                response => {
                    this.cartService.createOrClearCart();
                    const location = response.headers.get('location');
                    this.pedido_id = this.extractIdFromLocation(location);
                },
                error => {
                    if (error.status == 403) {
                        this.navCtrl.setRoot('HomePage');
                    }
                }
            );
    }

    private extractIdFromLocation(location: string) {
        const position = location.lastIndexOf('/');
        return location.substring(position + 1, location.length);
    }
}
