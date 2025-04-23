import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import {} from '@fortawesome/angular-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-team',
  standalone: false,
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export class TeamComponent implements AfterViewInit {
  faInstagram = faInstagram;
  @ViewChild('swiperEl', { static: false }) swiperElRef!: ElementRef;

  team = [
    { nombre: 'SERGIO', rol: 'CEO', img: '/assets/img/1.webp' },
    { nombre: 'ALVARO', rol: 'CONSULTOR DE DIRECCIÓN', img:'/assets/img/3.webp' },
    { nombre: 'SARA', rol: 'ESTRATEGIA VISUAL', img: '/assets/img/2.webp' },
    { nombre: 'MARTA', rol: 'MARKETING DIGITAL', img: '/assets/img/5.webp' },
    { nombre: 'JAVI', rol: 'ENTRENADOR PERSONAL', img:'/assets/img/4.webp' },
    { nombre: 'DANI', rol: 'ENTRENADOR PERSONAL', img:'/assets/img/7.webp' },
    { nombre: 'JORGE', rol: 'ENTRENADOR PERSONAL', img:'/assets/img/8.webp' },
    { nombre: 'RAÚL', rol: 'ENTRENADOR PERSONAL', img:'/assets/img/8.webp' },
    { nombre: 'RUBEN', rol: 'NUTRICIONISTA & ENTRENADOR PERSONAL', img:'/assets/img/7.webp' },
  ];

  sliderBreakpoints: { [key: number]: {}} = {
    768: {
      slidesPerView: 1
    },
    1024: {
      slidesPerView: 3
    }
  }

  swiper: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.swiper?.update();
  }

  ngAfterViewInit() {
    this.swiper = this.swiperElRef.nativeElement.swiper;
  }

  slideNext() {
    this.swiper.slideNext();
  }

  slidePrev() {
    this.swiper.slidePrev();
  }
}
