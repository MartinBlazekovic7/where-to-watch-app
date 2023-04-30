import { trigger, style, transition, animate } from '@angular/animations';

export const inAnimation = [
  trigger('inAnimation', [
    transition(':enter', [
      style({ height: 0, opacity: 0 }),
      animate('0.5s ease-out', style({ height: 600, opacity: 1 })),
    ]),
    transition(':leave', [
      style({ height: 300, opacity: 1 }),
      animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
    ]),
  ]),
];
export const fadeIn = [
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('0.5s ease-out', style({ opacity: 1 })),
    ]),
  ]),
];
