import { Routes } from '@angular/router'
import { MainLayoutComponent } from './main-layout.component'

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'slots',
                pathMatch: 'full',
            },
            {
                path: 'slots',
                loadComponent: () =>
                    import('./features/slots/slots.component').then(
                        (m) => m.SlotsComponent
                    ),
            },
            {
                path: 'sports',
                loadComponent: () =>
                    import('./features/sport/sport.component').then(
                        (m) => m.SportComponent
                    ),
            },
            {
                path: 'live',
                loadComponent: () =>
                    import('./features/live/live.component').then(
                        (m) => m.LiveComponent
                    ),
            },
            {
                path: 'casino',
                loadComponent: () =>
                    import('./features/casino/casino.component').then(
                        (m) => m.CasinoComponent
                    ),
            },
        ],
    },
]
