import { Component, ContentChild, inject, Input, OnInit } from '@angular/core'
import { NgClass, NgTemplateOutlet } from '@angular/common'
import { NavbarLogoDirective } from '../../directives/navbar-logo.directive'
import { NavbarMenuItemInterface } from '../../shared/interfaces/navbar-menu-item.interface'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { languages } from '../../shared/constants/languages'
import { LanguagesService } from '../../shared/services/languages.service'

@Component({
    selector: 'nav[app-navbar]',
    standalone: true,
    template: `
        <div class="app-navbar__top-navbar">
            <div class="app-navbar__languages-container">
                @for (language of languages; track language.code) {
                    <button
                        class="app-navbar__language-btn"
                        [ngClass]="{
                            active:
                                language.code ===
                                languagesService.currentLanguage
                        }"
                        (click)="languagesService.changeLanguage(language.code)"
                    >
                        <img
                            style="width: 2.4rem; height: 1.6rem"
                            [src]="language.icon"
                        />
                        {{ language.title }}
                    </button>
                }
            </div>
        </div>
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
                        <a [routerLink]="menuItem.route">
                            <img
                                [src]="'assets/icons/' + menuItem.icon"
                                alt="Menu Icon"
                            />
                            <p>{{ menuItem.title | translate }}</p>
                        </a>
                    </li>
                }
            </ul>
        </div>
    `,
    styleUrls: ['./navbar.component.scss'],
    imports: [
        NgTemplateOutlet,
        RouterLink,
        RouterLinkActive,
        TranslateModule,
        NgClass,
    ],
})
export class NavbarComponent {
    public languagesService = inject(LanguagesService)

    @ContentChild(NavbarLogoDirective)
    logo!: NavbarLogoDirective
    @Input() navbarMenuItems!: NavbarMenuItemInterface[]

    languages = languages
}
