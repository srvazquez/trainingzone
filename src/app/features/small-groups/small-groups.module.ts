import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form.component';
import { SmallGroupsComponent } from './small-groups.component';
import { ContainerComponent } from '../../shared/components/container/container.component';

const routes: Routes = [
    {
        path: '',
        component: SmallGroupsComponent
    }
];

@NgModule({
  declarations: [
    SmallGroupsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ContactFormComponent,
    ContainerComponent
  ],
  providers: []
})
export class SmallGroupsModule { }
