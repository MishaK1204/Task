import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SlotCategories } from '../../shared/constants/slots-categories'
import {RouterLink, RouterLinkActive} from '@angular/router'

@Component({
    selector: 'app-slot-categories',
    standalone: true,
    template: `
        <ul class="app-slot-categories__category-items-list">
            @for (category of slotCategories; track category.category) {
                <li class="app-slot-categories__category-item" routerLinkActive="app-slot-categories__active-link">
                    <a
                        routerLink=""
                        [queryParams]="{
                            category: category.category
                        }"
                    >
                        <img
                            [src]="'assets/icons/' + category.icon"
                            style="width: 2rem; height: 2rem;"
                            alt="Category Icon"
                        />
                        {{ category.name }}</a
                    >
                </li>
            }
        </ul>
    `,
    styleUrls: ['slot-categories.component.scss'],
    imports: [RouterLink, RouterLinkActive],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotCategoriesComponent {
    slotCategories = SlotCategories
}
