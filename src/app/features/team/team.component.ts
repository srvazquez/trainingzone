import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
    { nombre: 'SERGIO', rol: 'CEO', img: '/assets/img/sergio.webp' },
    { nombre: 'SARA', rol: 'PRODUCCIÓN AUDIOVISUAL', img:'/assets/img/sara.webp' },
    { nombre: 'ANA', rol: 'NUTRICIONISTA', img: '/assets/img/ana.webp' },
    { nombre: 'SERGIO', rol: 'CEO', img: '/assets/img/sergio.webp' },
    { nombre: 'SARA', rol: 'PRODUCCIÓN AUDIOVISUAL', img:'/assets/img/sara.webp' },
    { nombre: 'ANA', rol: 'NUTRICIONISTA', img: '/assets/img/ana.webp' }
  ];

  swiper: any;

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
