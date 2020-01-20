import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-categorias',
    templateUrl: 'categorias.html',
})
export class CategoriasPage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public service: CategoriaService) { }

    ionViewDidLoad() {
        this.service
            .findAll()
            .subscribe(
                response => console.log(response),
                error => console.log(error));
    }
}
