import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { FormlyModule } from '@ngx-formly/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), importProvidersFrom(FormlyModule.forRoot({
    validationMessages: [
      { name: 'required', message: 'This field is required' },
    ],
  }))],
};
