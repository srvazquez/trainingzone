import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { TeamComponent } from './team.component';

const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
  },
];

@NgModule({
  declarations: [TeamComponent],
  imports: [
    RouterModule.forChild(routes),
    ContactFormComponent,
    ContainerComponent,
    FontAwesomeModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamModule {
}
