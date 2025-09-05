import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { filter, Subscription } from 'rxjs';

interface MenuItem {
  name: string;
  url: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'], // 👈 ojo plural
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatSidenavContent) sidenavContent!: MatSidenavContent;

  private navSub?: Subscription;

  activePath = '';
  faBars = faBars;

  menuItems: MenuItem[] = [
    { name: 'Inicio', url: '/home' },
    { name: 'Planes', url: '/plans' },
    { name: 'Grupos reducidos', url: '/small-groups' },
    { name: 'Equipo', url: '/team' },
    { name: 'Contacto', url: '/contact' },
    { name: 'Blog', url: '/blog' },
    { name: 'Calculadora', url: '/calculator' },
  ];

  constructor(
    private readonly router: Router,
    private translate: TranslateService
  ) {
    // Idioma por defecto
    translate.setDefaultLang('es');
    translate.use('es');
  }

  ngAfterViewInit(): void {
    // Suscríbete a la navegación una vez que la vista (y el sidenav) existen
    this.navSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((val: NavigationEnd) => {
        // Actualiza ruta activa y sube al top
        this.activePath = val.urlAfterRedirects.substring(1);
        this.scrollToTop();

        // Cierra SIEMPRE el menú si está abierto (independientemente del mode)
        if (this.sidenav?.opened) {
          this.sidenav.close();
        }
      });
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }

  // Útil si quieres cerrar explícitamente al hacer click en un enlace del menú
  onLinkClick(): void {
    if (this.sidenav?.opened) {
      this.sidenav.close();
    }
  }

  private scrollToTop() {
    if (this.sidenavContent) {
      this.sidenavContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
