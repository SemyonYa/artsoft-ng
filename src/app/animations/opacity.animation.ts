import { trigger, transition, style, animate } from '@angular/animations';

export const opacityAnimation =
    trigger('opacityAnimation', [
        transition(':enter', [
            style({
                opacity: 0,
            }),
            animate('.3s ease-out',
                style({
                    opacity: '*',
                }))
        ]),
        transition(':leave', [
            style({
                opacity: '*',
            }),
            animate('0.3s ease-in',
                style({
                    opacity: 0,
                }))
        ])
    ]);
