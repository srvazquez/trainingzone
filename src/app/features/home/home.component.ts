import { Component } from '@angular/core';

interface ItemInfo {
  text: string;
  description?: string;
}

interface GridItemData {
  title: string;
  description: string;
  mainList: string[];
  img: string;
  keyDifferences: ItemInfo[];
  serviceForamt: ItemInfo[];
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  grid: GridItemData[] = [
    {
      title: 'Entrenamiento personal.',
      description: '"Resultados reales con un entrenador QUE<br />DISEÑA TU PLAN AL 100% PARA TI."',
      mainList: [
        'ENTRENAMIENTO 100% ADAPTADO A TU NIVEL, OBJETIVOS Y DISPONIBILIDAD.',
        'EVALUACIÓN INICIAL PARA DISEÑAR EL MEJOR PLAN PARA TI',
        'CORRECCIÓN DE TÉCNICA Y SEGUIMIENTO PERSONALIZADO EN CADA SESIÓN.',
        'FLEXIBILIDAD TOTAL: ELIGE DÍAS, HORARIOS Y LA FRECUENCIA QUE MEJOR TE VENGA.'
      ],
      img: '/assets/img/photo-1.webp',
      keyDifferences: [
        { 
          text: 'ENTRENADOR PERSONAL EN CADA SESIÓN.<br>ATENCIÓN 1 A 1 EXCLUSIVA'
        },
        { text: 'ADAPTADO A LESIONES, NECESIDADES ESPECÍFICAS Y OBJETIVOS' },
        { text: 'PLAN DE ENTRENAMIENTO Y ASESORAMIENTO EN HÁBITOS.'}
      ],
      serviceForamt: [
        {
          text: 'Presencial en Training Zone',
        },
        {
          text: 'Horarios flexibles a tu medida',
          description: '(Lunes a Viernes 7:00 - 22:00. Sábados y domingos 8:00 - 13:00)'
        }
      ]
    },
    {
      title: 'Grupos reducidos',
      description: '"Entrena en equipo, mejora al máximo."',
      mainList: [
        'MÁXIMO 8-12 PERSONAS POR GRUPO PARA GARANTIZAR ATENCIÓN DE CALIDAD.',
        'PLANES ADAPTADOS AL NIVEL Y OBJETIVOS DE CADA GRUPO.',
        'CORRECCIÓN DE TÉCNICA Y AJUSTES PERSONALIZADOS EN CADA SESIÓN.',
        'AMBIENTE MOTIVADOR PARA MEJORAR SIN EXCUSAS'
      ],
      img: '/assets/img/photo-2.webp',
      keyDifferences: [
        {
          text: 'ENTRENADOR GUIANDO Y ADAPTANDO CADA ENTRENAMIENTO.',
        },
        {
          text: 'ENERGÍA DE GRUPO + MEJORA INDIVIDUAL.',
        },
        {
          text: 'HORARIOS FLEXIBLES, ELIGE CUÁNDO VENIR',
        },
        {
          text: 'MÁS ECONÓMICO QUE EL ENTRENAMIENTO 1 A 1.',
        }
      ],
      serviceForamt: [
        {
          text: 'Presencial en Training Zone',
        },
        {
          text: 'Horarios flexibles a tu medida',
          description: '(Lunes a Viernes 7:00 - 22:00. Sábados y domingos 8:00 - 13:00)'
        }
      ]
    },
    {
      title: 'Plan Online',
      description: '"Entrena donde quieras, con un plan<br>diseñado para ti."',
      mainList: [
        'Accede a un plan totalmente adaptado a tus objetivos y ritmo de vida',
        'Vídeos explicativos + asesoramiento vía chat/llamada',
        'Flexibilidad total: entrena a tu ritmo sin depender de horarios fijos.',
        'OPCIÓN CON NUTRICIÓN PARA MAXIMIZAR RESULTADOS.'
      ],
      img: '/assets/img/photo-3.webp',
      keyDifferences: [
        {
          text: '100% online desde cualquier lugar.'
        },
        { 
          text: 'Adaptado a tu disponibilidad.'
        }
      ],
      serviceForamt: [
        {
          text: 'Presencial en Training Zone',
        },
        {
          text: 'Horarios flexibles a tu medida',
          description: '(Lunes a Viernes 7:00 - 22:00. Sábados y domingos 8:00 - 13:00)'
        }
      ]
    }
  ]
}
