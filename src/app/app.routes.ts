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
        ],
    },
]
