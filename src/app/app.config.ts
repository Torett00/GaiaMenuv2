import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
const firebaseConfig = {
  apiKey: "AIzaSyBQCY4btO9a9-r76aGGtzUU6kOP6oD_bSg",
  authDomain: "menugaia.firebaseapp.com",
  databaseURL: "https://menugaia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "menugaia",
  storageBucket: "menugaia.firebasestorage.app",
  messagingSenderId: "111145652694",
  appId: "1:111145652694:web:30cc73acc9179c2b33d477",
  measurementId: "G-DRQG2Y2ZPK"
};
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage()),
    provideAuth(()=>getAuth()),
  
    

  ]
};
