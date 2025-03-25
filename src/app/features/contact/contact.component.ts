import { Component } from '@angular/core';
import { ApiService } from '../../core/api.service';


@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
 
  constructor(private apiService: ApiService) {
      this.apiService.getData().subscribe({
        next: (res) => console.log(res),
        error: (err) => console.warn(err)
      });
    
  }
}
