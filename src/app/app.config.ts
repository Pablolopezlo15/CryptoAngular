import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"crypto-angular-7d584","appId":"1:1013453664753:web:bb30f3665908391e8f5450","storageBucket":"crypto-angular-7d584.appspot.com","apiKey":"AIzaSyA1cTKFUCkJjN-D7k5jQLBvUjRJXYm49U0","authDomain":"crypto-angular-7d584.firebaseapp.com","messagingSenderId":"1013453664753","measurementId":"G-374DWCDYZE"}))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),

  ]
};


