import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansComponent } from './plans.component';
import { ContainerComponent } from '../../shared/components/container/container.component';

const routes: Routes = [
    {
        path: '',
        component: PlansComponent
    }
];

@NgModule({
  declarations: [
    PlansComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ContainerComponent
  ],
  providers: []
})
export class PlansModule { }
