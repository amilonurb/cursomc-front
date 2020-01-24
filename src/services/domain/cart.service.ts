import { ProdutoDTO } from './../../models/produto.dto';
import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart';
import { StorageService } from './../storage.service';

@Injectable()
export class CartService {

    constructor(public storageService: StorageService) { }

    createOrClearCart(): Cart {
        const cart: Cart = { items: [] };
        this.storageService.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        const cart = this.storageService.getCart();
        if (cart == null) {
            return this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        const cart = this.getCart();
        const position = cart.items.findIndex(p => p.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({ quantidade: 1, produto });
        }
        this.storageService.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO): Cart {
        const cart = this.getCart();
        const position = cart.items.findIndex(p => p.produto.id == produto.id);
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        this.storageService.setCart(cart);
        return cart;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        const cart = this.getCart();
        const position = cart.items.findIndex(p => p.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        this.storageService.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        const position = cart.items.findIndex(p => p.produto.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade--;

            if (cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storageService.setCart(cart);
        return cart;
    }

    total(): number {
        const cart = this.getCart();
        const result = cart.items.reduce(function (previous, current) {
            return previous + (current.produto.preco * current.quantidade);
        }, 0);
        return result;
    }
}