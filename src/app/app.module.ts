import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { AuthService } from './../services/auth.service';
import { ClienteService } from './../services/domain/cliente.service';
import { StorageService } from './../services/storage.service';
import { CategoriaService } from './../services/domain/categoria.service';

import { AuthInterceptorProvider } from './../interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';

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
        AuthInterceptorProvider,
        ErrorInterceptorProvider
    ]
})
export class AppModule { }
