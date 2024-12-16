import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  Firestore,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { seedDatabase } from './utils/seed-database';

const initializeDatabase = async (db: Firestore) => {
  if (!environment.production) {
    try {
      const wasSeeded = await seedDatabase(db);
      if (wasSeeded) {
        console.log(
          'Development database was empty and has been seeded successfully.'
        );
      } else {
        console.log(
          'Development database already contains questions. No seeding needed.'
        );
      }
    } catch (error) {
      console.error('Error during database initialization:', error);
    }
  }
  return db;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const db = getFirestore();
      initializeDatabase(db);
      return db;
    }),
    provideAuth(() => getAuth()),
  ],
};
