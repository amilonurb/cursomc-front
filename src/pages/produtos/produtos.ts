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

    produtos: ProdutoDTO[] = [];

    currentPage: number = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loadingController: LoadingController,
        public produtoService: ProdutoService) { }

    ionViewDidLoad() {
        this.loadData();
    }

    private loadData() {
        const loader = this.presentLoading();
        const { categoria_id } = this.navParams.data;
        this.produtoService
            .findByCategoria(categoria_id, this.currentPage, 10)
            .subscribe(response => {
                loader.dismiss();
                const oldLength = this.produtos.length;
                const newLength = this.produtos.push(response['content']);
                this.loadSmallImages(oldLength, newLength - 1);
            }, error => loader.dismiss());
    }

    loadSmallImages(start: number, end: number) {
        for (let index = start; index <= end; index++) {
            const produto = this.produtos[index];

            this.produtoService
                .getSmallImageFromBucket(produto.id)
                .subscribe(
                    response => produto.imageURL = `${API_CONFIG.bucketBaseURL}/prod${produto.id}-small.jpg`,
                    error => { }
                );
        }
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

    doRefresh(event) {
        this.currentPage = 0;
        this.produtos = [];
        this.loadData();
        setTimeout(() => event.target.complete(), 2000);
    }

    doInfinite(infiniteScroll) {

        this.currentPage++;
        this.loadData();

        setTimeout(() => {
            infiniteScroll.complete();
        }, 1000);
    }
}
