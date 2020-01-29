import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from './../../config/api.config';

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
        public loadingController: LoadingController,
        public produtoService: ProdutoService) { }

    ionViewDidLoad() {
        const loader = this.presentLoading();

        const { categoria_id } = this.navParams.data;

        this.produtoService
            .findByCategoria(categoria_id)
            .subscribe(
                response => {
                    loader.dismiss();
                    this.produtos = response['content'];
                    this.loadSmallImages();
                },
                error => loader.dismiss()
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

    presentLoading() {
        const loader = this.loadingController.create({
            content: 'Aguarde...'
        });
        loader.present();
        return loader;
    }
}
