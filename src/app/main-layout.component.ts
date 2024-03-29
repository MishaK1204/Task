import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { NavbarComponent } from './ui/navbar/navbar.component'
import { NavbarLogoDirective } from './directives/navbar-logo.directive'
import { NavbarMenuItemInterface } from './shared/interfaces/navbar-menu-item.interface'
import { navbarMenuItems } from './shared/constants/navbar-menu-items'

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink, NavbarComponent, NavbarLogoDirective],
    template: `
        <header>
            <nav app-navbar [navbarMenuItems]="navbarMenuItems">
                <a routerLink="/" *vUiNavbarLogo>
                    <img src="assets/icons/logo.svg" alt="Logo" />
                </a>
            </nav>
        </header>

        <main>
            <router-outlet></router-outlet>
        </main>
    `,
    styles: [
        `
            :host {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
            }

            main {
                margin: 0.8rem 0.8rem 0.8rem 8.8rem;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
    navbarMenuItems: NavbarMenuItemInterface[] = navbarMenuItems
}
