import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CategoriaService } from './../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

import { API_CONFIG as api } from '../../config/api.config';

@IonicPage()
@Component({
    selector: 'page-categorias',
    templateUrl: 'categorias.html',
})
export class CategoriasPage {

    bucketURL: string = api.bucketBaseURL;

    items: CategoriaDTO[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public service: CategoriaService) { }

    ionViewDidLoad() {
        this.service
            .findAll()
            .subscribe(
                response => this.items = response,
                error => { });
    }

    showProdutos(categoria_id: string) {
        this.navCtrl.push('ProdutosPage', { categoria_id });
    }
}
