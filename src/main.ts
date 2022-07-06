import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { IConfig } from './app/core/Interfaces/config/IConfig';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
const config: IConfig = {
  apiUrl: 'https://nagp-backend-api.herokuapp.com/',
};
sessionStorage.setItem('configSettings', JSON.stringify(config));
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
