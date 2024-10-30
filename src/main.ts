import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { akitaDevtools } from '@datorama/akita';

bootstrapApplication(AppComponent).catch((err) => console.error(err));

akitaDevtools();
