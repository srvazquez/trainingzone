import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { CalculatorComponent } from './calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
const routes: Routes = [
  {
    path: '',
    component: CalculatorComponent,
  },
];

const materialModules = [
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
];

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContainerComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    FontAwesomeModule,
    ...materialModules,
  ],
  providers: [],
})
export class CalculatorModule {}
