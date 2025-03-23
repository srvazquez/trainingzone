import { Component, ViewChild } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
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
  @ViewChild(MatSidenavContent) sidenavContent!: MatSidenavContent;

  activePath: string = '';

  menuItems: MenuItem[] = [
    {
      name: 'Inicio',
      url: '/home',
    },
    {
      name: 'Planes',
      url: '/plans',
    },
    {
      name: 'Grupos reducidos',
      url: '/small-groups',
    },
    {
      name: 'Equipo',
      url: '/team',
      disabled: true,
    },
    {
      name: 'Contaco',
      url: '/contact',
    },
    {
      name: 'Blog',
      url: '/blog',
      disabled: true,
    },
  ];

  constructor(private readonly router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
      }
    });

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((val: NavigationEnd) => {
        this.scrollToTop();
        this.activePath = val.urlAfterRedirects.substring(1);
      });
  }

  private scrollToTop() {
    if (this.sidenavContent) {
      this.sidenavContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
