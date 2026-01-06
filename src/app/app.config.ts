import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, } from 'angular-in-memory-web-api';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { MockDataService } from './core/services/mock-data-service';
import { taskReducer } from './tasks/data/store/reducer';
import { TaskEffects } from './tasks/data/store/effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideStore({
      tasks: taskReducer
    }),
    provideEffects(
      [TaskEffects]
    ),
    provideRouter(routes),
    provideStoreDevtools({
      maxAge: 25,
      logOnly:  false
    }),
    provideHttpClient(withInterceptorsFromDi()),  
    importProvidersFrom( HttpClientInMemoryWebApiModule.forRoot(MockDataService, {delay: 500})), // register the in-memory web api module
  ]
};
