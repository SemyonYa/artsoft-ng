import { trigger, transition, style, animate } from '@angular/animations';

export const pageAnimation =
    trigger('pageAnimation', [
        transition(':enter', [
            style({
                transform: 'translateY(40px)',
                opacity: 0,
            }),
            animate('.5s ease-out',
                style({
                    transform: '*',
                    opacity: '*',
                }))
        ]),
        transition(':leave', [
            style({
                transform: '*',
                opacity: '*',
            }),
            animate('0.5s ease-in',
                style({
                    transform: 'translateY(40px)',
                    opacity: 0,
                }))
        ])
    ]);
