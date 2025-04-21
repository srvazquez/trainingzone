import { Component, ViewChild } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
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
  faBars = faBars;
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
      url: '/team'
    },
    {
      name: 'Contacto',
      url: '/contact',
    },
    {
      name: 'Blog',
      url: '/blog'
    },
    {
      name: 'Calculadora',
      url: '/calculator',
    },
  ];

  constructor(
    private readonly router: Router,
    private translate: TranslateService
  ) {
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

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('es');
  }

  private scrollToTop() {
    if (this.sidenavContent) {
      this.sidenavContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
