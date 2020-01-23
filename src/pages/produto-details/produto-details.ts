import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { API_CONFIG as api } from './../../config/api.config';
import { ProdutoDTO } from './../../models/produto.dto';
import { ProdutoService } from './../../services/domain/produto.service';

@IonicPage()
@Component({
    selector: 'page-produto-details',
    templateUrl: 'produto-details.html',
})
export class ProdutoDetailsPage {

    produto: ProdutoDTO;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public produtoService: ProdutoService) { }

    ionViewDidLoad() {
        const { produto_id } = this.navParams.data;

        this.produtoService
            .findById(produto_id)
            .subscribe(
                response => {
                    this.produto = response;
                    this.getImageIfExists();
                },
                error => { }
            );
    }

    getImageIfExists() {
        this.produtoService
            .getImageFromBucket(this.produto.id)
            .subscribe(
                response => this.produto.imageURL = `${api.bucketBaseURL}/prod${this.produto.id}.jpg`,
                error => { }
            );
    }
}
