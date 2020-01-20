import { Observable } from 'rxjs/Rx';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AlertController } from 'ionic-angular';

import { StorageService } from '../services/storage.service';

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

    handleDefaultError(error) {
        const alert = this.alertController.create({
            title: `Erro ${error.status}: ${error.error}`,
            message: error.message,
            enableBackdropDismiss: false,
            buttons: [{ text: 'Ok' }]
        });

        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
