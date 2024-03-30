import { Component, ContentChild, Input } from '@angular/core'
import { NgTemplateOutlet } from '@angular/common'
import { NavbarLogoDirective } from '../../directives/navbar-logo.directive'
import { NavbarMenuItemInterface } from '../../shared/interfaces/navbar-menu-item.interface'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
    selector: 'nav[app-navbar]',
    standalone: true,
    template: `
        <div class="app-navbar__top-navbar"></div>
        <div class="app-navbar__side-navbar">
            <div class="app-navbar__logo-container">
                <ng-container
                    *ngTemplateOutlet="logo.templateRef"
                ></ng-container>
            </div>

            <!-- Navbar menu items -->
            <ul class="app-navbar__menu-items-list">
                @for (menuItem of navbarMenuItems; track menuItem.title) {
                    <li
                        class="app-navbar__menu-item"
                        routerLinkActive="app-navbar__active-link"
                    >
                        <a
                            [routerLink]="menuItem.route"
                        >
                            <img
                                [src]="'assets/icons/' + menuItem.icon"
                                alt="Menu Icon"
                            />
                            <p>{{ menuItem.title }}</p>
                        </a>
                    </li>
                }
            </ul>
        </div>
    `,
    styleUrls: ['./navbar.component.scss'],
    imports: [NgTemplateOutlet, RouterLink, RouterLinkActive],
})
export class NavbarComponent {
    @ContentChild(NavbarLogoDirective)
    logo!: NavbarLogoDirective

    @Input() navbarMenuItems!: NavbarMenuItemInterface[]
}
