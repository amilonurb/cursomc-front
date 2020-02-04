import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EstadoDTO } from './../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {

    formGroup: FormGroup;

    estados: EstadoDTO[];
    cidades: CidadeDTO[];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        public alertController: AlertController,
        public cidadeService: CidadeService,
        public estadoService: EstadoService,
        public clienteService: ClienteService) {

        this.formGroup = this.formBuilder.group({
            nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
            email: ['', [Validators.required, Validators.email]],
            tipoCliente: ['', [Validators.required]],
            cpfOuCnpj: ['', [Validators.required]],
            password: ['', [Validators.required]],
            logradouro: ['', [Validators.required]],
            numero: ['', [Validators.required]],
            complemento: ['', []],
            bairro: ['', []],
            cep: ['', [Validators.required]],
            telefone1: ['', [Validators.required]],
            telefone2: ['', []],
            telefone3: ['', []],
            estadoId: [null, [Validators.required]],
            cidadeId: [null, [Validators.required]]
        });
    }

    ionViewDidLoad() {
        this.estadoService
            .findAll()
            .subscribe(
                response => {
                    this.estados = response;
                    this.formGroup.controls.estadoId.setValue(this.estados[0].id);
                    this.updateCidades();
                },
                error => { }
            );
    }

    updateCidades() {
        const estado_id = this.formGroup.value.estadoId;
        this.cidadeService
            .findAll(estado_id)
            .subscribe(
                response => {
                    this.cidades = response;
                    this.formGroup.controls.cidadeId.setValue(null);
                },
                error => { }
            );
    }

    signupUser() {
        let clientValues = this.formGroup.value;
        clientValues.codigoTipoCliente = clientValues.tipoCliente;
        clientValues.telefoneObrigatorio = clientValues.telefone1;
        clientValues.telefoneOpcional1 = clientValues.telefone2;
        clientValues.telefoneOpcional2 = clientValues.telefone3;
        console.log(clientValues);

        this.clienteService
            .insert(clientValues)
            .subscribe(
                response => this.showInsertOK(),
                error => { }
            );
    }

    showInsertOK() {
        const alert = this.alertController.create({
            title: 'Sucesso',
            message: 'Cadastro realizado com sucesso',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok',
                    handler: () => { this.navCtrl.setRoot('HomePage') }
                }
            ]
        });

        alert.present();
    }
}
