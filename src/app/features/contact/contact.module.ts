import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { MapComponent } from '../../shared/components/map/map.component';
import { ContactComponent } from './contact.component';
import { ApiService } from '../../core/api.service';

const routes: Routes = [
    {
        path: '',
        component: ContactComponent
    }
];

@NgModule({
  declarations: [
    ContactComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ContactFormComponent,
    ContainerComponent,
    MapComponent 
  ],
  providers: [
    ApiService
  ]
})
export class ContactModule { }
