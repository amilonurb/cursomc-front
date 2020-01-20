import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { API_CONFIG as api } from './../../config/api.config';

import { StorageService } from './../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    cliente: ClienteDTO;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public storageService: StorageService,
        public clienteService: ClienteService) { }

    ionViewDidLoad() {
        let localUser = this.storageService.getLocalUser();

        if (localUser && localUser.email) {
            this.clienteService
                .findByEmail(localUser.email)
                .subscribe(
                    response => {
                        this.cliente = response;
                        this.getImageIfExists();
                    },
                    error => { }
                );
        }
    }

    getImageIfExists() {
        this.clienteService
            .getImageFromBucket(this.cliente.id)
            .subscribe(
                response => this.cliente.profileImgURL = `${api.bucketBaseURL}/cp${this.cliente.id}.jpg`,
                error => { }
            );
    }
}
