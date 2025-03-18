import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface MenuItem {
  name: string;
  url: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  activePath: string = '';

  menuItems: MenuItem[] = [
    {
      name: 'Inicio',
      url: '/home'
    },
    {
      name: 'Planes',
      url: '/plans'
    },
    {
      name: 'Grupos reducidos',
      url: '/small-groups'
    },
    {
      name: 'Equipo',
      url: '/team',
      disabled: true
    },
    {
      name: 'Contaco',
      url: '/contact'
    },
    {
      name: 'Blog',
      url: '/blog',
      disabled: true
    }
  ]

  constructor(private readonly router: Router) {
  

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(
        (val: NavigationEnd) =>
          (this.activePath = val.urlAfterRedirects.substring(1))
      );
  }
}
