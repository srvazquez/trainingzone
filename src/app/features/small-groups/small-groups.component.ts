import { Component } from '@angular/core';

type tag = 'Grupos';

interface Plan {
  title: string;
  tag: tag;
  price: number;
  unit: string;
  hint?: string;
}

@Component({
  selector: 'app-small-groups',
  standalone: false,
  templateUrl: './small-groups.component.html',
  styleUrl: './small-groups.component.scss',
})
export class SmallGroupsComponent {
  plans: Plan[] = [
    {
      title: 'Entrneamiento de <br><strong>4 sesiones al mes.</strong>',
      tag: 'Grupos',
      price: 65,
      unit: '€/persona',
      hint: 'Cada persona deberá comprar <br>su acceso.',
    },
    {
      title: 'Entrneamiento de <br><strong>8 sesiones al mes.</strong>',
      tag: 'Grupos',
      price: 99,
      unit: '€/persona',
      hint: 'Cada persona deberá comprar <br>su acceso.',
    },
    {
      title: 'Entrneamiento de <br><strong>12 sesiones al mes.</strong>',
      tag: 'Grupos',
      price: 129,
      unit: '€/persona',
      hint: 'Cada persona deberá comprar <br>su acceso.',
    },
  ];
}
