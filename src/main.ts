import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { register as registerSwiperElements } from 'swiper/element/bundle';

// Register Swiper custom elements. We do this
// before bootstrapping the Angular application
// so that they're available before any part of
// our application tries rendering them.
registerSwiperElements();

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
