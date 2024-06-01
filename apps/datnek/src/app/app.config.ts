import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { FormlyModule } from '@ngx-formly/core';
import { NgxsModule } from '@ngxs/store';
import { EventState } from './core/state/event/event.state';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), 
    importProvidersFrom(FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    })),

    importProvidersFrom(NgxsModule.forRoot([EventState])),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(ApiService, { delay: 100 }))


  ],
};
