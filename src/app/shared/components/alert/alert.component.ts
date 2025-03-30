import { Component, Input } from '@angular/core';

@Component({
  selector: 'tz-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input({required: true}) message!: string;
}
