import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

import { CredenciaisDTO } from './../../models/credenciais.dto';
import { AuthService } from './../../services/auth.service';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    credenciais: CredenciaisDTO = {
        email: "",
        senha: ""
    }

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        public authService: AuthService) { }

    login() {
        this.authService
            .authenticate(this.credenciais)
            .subscribe(
                response => {
                    this.authService.successfulLogin(response.headers.get('Authorization'));
                    this.navCtrl.setRoot('CategoriasPage');
                },
                error => { }
            );
    }

    ionViewWillEnter() {
        this.menu.swipeEnable(false);
    }

    ionViewDidLeave() {
        this.menu.swipeEnable(true);
    }

    ionViewDidEnter() {
        this.authService
            .refreshToken()
            .subscribe(
                response => {
                    this.authService.successfulLogin(response.headers.get('Authorization'));
                    this.navCtrl.setRoot('CategoriasPage');
                },
                error => { }
            );
    }

    signup() {
        this.navCtrl.push('SignupPage');
    }
}
