import { AngularFireAuth } from 'angularfire2/auth';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';


export const firebaseConfig = {
  apiKey: "AIzaSyCmhmDBp8bq_cUIqfUhNtVwiUN7QBCU530",
  authDomain: "ps-test-ionic.firebaseapp.com",
  databaseURL: "https://ps-test-ionic.firebaseio.com",
  projectId: "ps-test-ionic",
  storageBucket: "ps-test-ionic.appspot.com",
  messagingSenderId: "884273426528"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
