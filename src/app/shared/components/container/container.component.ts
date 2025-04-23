import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  templateUrl: './container.component.html'
})
export class ContainerComponent {
  @Input() size: '2xl' | 'xl' | 'lg' | 'md' | 'sm' = 'xl';
}
