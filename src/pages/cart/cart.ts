import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG as api } from '../../config/api.config';
import { CartItem } from '../../models/cart-item';
import { ProdutoDTO } from '../../models/produto.dto';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';

IonicPage()
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage {

    items: CartItem[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public cartService: CartService,
        public produtoService: ProdutoService) { }

    ionViewDidLoad() {
        const cart = this.cartService.getCart();
        this.items = cart.items;
        this.loadImages();
    }

    loadImages() {
        this.items.forEach(item => {
            const produto = item.produto;
            this.produtoService
                .getSmallImageFromBucket(produto.id)
                .subscribe(
                    response => produto.imageURL = `${api.bucketBaseURL}/prod${produto.id}-small.jpg`,
                    error => { }
                );
        });
    }

    removeItem(produto: ProdutoDTO) {
        this.items = this.cartService.removeProduto(produto).items;
    }

    increaseQuantity(produto: ProdutoDTO) {
        this.items = this.cartService.increaseQuantity(produto).items;
    }

    decreaseQuantity(produto: ProdutoDTO) {
        this.items = this.cartService.decreaseQuantity(produto).items;
    }

    total() {
        return this.cartService.total();
    }

    goOn() {
        this.navCtrl.setRoot('CategoriasPage');
    }
}
