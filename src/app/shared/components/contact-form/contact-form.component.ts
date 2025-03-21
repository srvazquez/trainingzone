import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  imports: [FontAwesomeModule]
})
export class ContactFormComponent {
  faPhone = faPhone;

  
}
