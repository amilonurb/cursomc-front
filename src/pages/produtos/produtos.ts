import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
    selector: 'page-produtos',
    templateUrl: 'produtos.html',
})
export class ProdutosPage {

    produtos: ProdutoDTO[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public produtoService: ProdutoService) { }

    ionViewDidLoad() {
        const { categoria_id } = this.navParams.data;

        this.produtoService
            .findByCategoria(categoria_id)
            .subscribe(
                response => {
                    this.produtos = response['content'];
                    this.loadSmallImages();
                },
                error => { }
            );
    }

    loadSmallImages() {
        this.produtos.forEach(produto => {
            this.produtoService
                .getSmallImageFromBucket(produto.id)
                .subscribe(
                    response => produto.imageURL = `${API_CONFIG.bucketBaseURL}/prod${produto.id}-small.jpg`,
                    error => { }
                );
        });
    }

    showDetails(produto_id: string) {
        this.navCtrl.push('ProdutoDetailsPage', { produto_id });
    }
}
