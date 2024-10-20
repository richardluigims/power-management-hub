import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { appProviders } from './app.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    appProviders,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)]
};
