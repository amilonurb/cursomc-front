import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { ProdutoService } from '../services/domain/produto.service';
import { AuthInterceptorProvider } from './../interceptors/auth-interceptor';
import { AuthService } from './../services/auth.service';
import { CartService } from './../services/domain/cart.service';
import { CategoriaService } from './../services/domain/categoria.service';
import { ClienteService } from './../services/domain/cliente.service';
import { ImageUtilService } from './../services/image-util.service';
import { StorageService } from './../services/storage.service';
import { MyApp } from './app.component';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },

        AuthService,
        ClienteService,
        StorageService,
        CategoriaService,
        ProdutoService,
        CartService,
        ImageUtilService,

        AuthInterceptorProvider,
        ErrorInterceptorProvider
    ]
})
export class AppModule { }
