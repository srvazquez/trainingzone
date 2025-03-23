import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { SmallGroupsComponent } from './small-groups.component';

const routes: Routes = [
  {
    path: '',
    component: SmallGroupsComponent,
  },
];

@NgModule({
  declarations: [SmallGroupsComponent],
  imports: [
    RouterModule.forChild(routes),
    ContactFormComponent,
    ContainerComponent,
    FontAwesomeModule
  ],
  providers: [],
})
export class SmallGroupsModule {
}
