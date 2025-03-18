import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ContactFormComponent } from "../../shared/components/contact-form/contact-form.component";
import { ContainerComponent } from '../../shared/components/container/container.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ContactFormComponent,
    ContainerComponent
],
  providers: []
})
export class HomeModule { }
