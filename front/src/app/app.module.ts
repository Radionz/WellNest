import { Local } from './../providers/local.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from './home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { HttpModule } from '@angular/http';
import {Popup} from './popup/popup'
import { ChartsModule } from 'ng2-charts';

export const firebaseConfig = {
  apiKey: "AIzaSyDnWtrvXWUPMCF-qBdam-jr8Q8XKEkH3Ds",
  authDomain: "wellnest-39396.firebaseapp.com",
  databaseURL: "https://wellnest-39396.firebaseio.com",
  projectId: "wellnest-39396",
  storageBucket: "wellnest-39396.appspot.com",
  messagingSenderId: "929248141108"
};




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Popup,
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    HttpModule,    
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Popup,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Local,
    AngularFireDatabaseModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}