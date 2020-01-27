import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
    selector: 'page-pick-address',
    templateUrl: 'pick-address.html',
})
export class PickAddressPage {

    enderecos: EnderecoDTO[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PickAddressPage');
    }

}