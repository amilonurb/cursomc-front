import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG as api } from './../../config/api.config';
import { StorageService } from './../../services/storage.service';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    cliente: ClienteDTO;
    picture: string;
    cameraOn: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private camera: Camera,
        public storageService: StorageService,
        public clienteService: ClienteService) { }

    ionViewDidLoad() {
        let localUser = this.storageService.getLocalUser();

        if (localUser && localUser.email) {
            this.clienteService
                .findByEmail(localUser.email)
                .subscribe(
                    response => {
                        this.cliente = response as ClienteDTO;
                        this.getImageIfExists();
                    },
                    error => {
                        if (error.status == 403) {
                            this.navCtrl.setRoot('HomePage');
                        }
                    }
                );
        } else {
            this.navCtrl.setRoot('HomePage');
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

    getCameraPicture() {

        this.cameraOn = true;

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            this.picture = 'data:image/png;base64,' + imageData;
            this.cameraOn = false;
        }, (error) => { });
    }
}
