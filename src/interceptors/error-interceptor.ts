import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AlertController } from 'ionic-angular';

import { StorageService } from '../services/storage.service';
import { FieldMessage } from '../models/fieldMessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService, public alertController: AlertController) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next
            .handle(req)
            .catch((error, caught) => {

                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }

                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                console.log('Erro detectado pelo interceptador');
                console.log(errorObj);

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;

                    case 403:
                        this.handle403();
                        break;

                    case 422:
                        this.handle422(errorObj);
                        break;

                    default:
                        this.handleDefaultError(errorObj);
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    handle401() {
        const alert = this.alertController.create({
            title: 'Erro 401: falha de autenticação',
            message: 'E-mail ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [{ text: 'Ok' }]
        });

        alert.present();
    }

    handle403() {
        this.storageService.setLocalUser(null);
    }

    handle422(errors) {
        const alert = this.alertController.create({
            title: 'Erro 422: validação',
            message: this.listErrors(errors.errors),
            enableBackdropDismiss: false,
            buttons: [{ text: 'Ok' }]
        });

        alert.present();
    }

    handleDefaultError(error) {
        const alert = this.alertController.create({
            title: `Erro ${error.status}: ${error.error}`,
            message: error.message,
            enableBackdropDismiss: false,
            buttons: [{ text: 'Ok' }]
        });

        alert.present();
    }

    listErrors(messages: FieldMessage[]): string {
        let result = '';
        messages.forEach(message =>
            result += `<p><strong>${message.fieldName}</strong>: ${message.errorMessage}</p>`
        );
        return result;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
