import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { SlotCategories } from '../../shared/constants/slots-categories'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { SlotsService } from '../../shared/services/slots.service'
import { NgClass } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
    selector: 'app-slot-categories',
    standalone: true,
    template: `
        <ul class="app-slot-categories__category-items-list">
            @for (category of slotCategories; track category.category) {
                <li
                    class="app-slot-categories__category-item"
                    [ngClass]="{
                        'app-slot-categories__active-link':
                            slotsService.currentFilter() === 'web:popular' &&
                            category.category === 'web:popular'
                    }"
                    routerLinkActive="app-slot-categories__active-link"
                >
                    @if (slotsService.totalGames()) {
                        <div class="app-slot-categories__total-games">
                            {{
                                slotsService
                                    .totalGames()
                                    ?.get(category.category)
                            }}
                        </div>
                    }

                    <a
                        (click)="onCategoryChange(category.category)"
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
                        {{ category.name | translate }}</a
                    >
                </li>
            }
        </ul>
    `,
    styleUrls: ['slot-categories.component.scss'],
    imports: [RouterLink, RouterLinkActive, NgClass, TranslateModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotCategoriesComponent {
    public slotsService = inject(SlotsService)

    slotCategories = SlotCategories

    constructor() {
        this.slotsService.getCategoryTotalGames().subscribe()
    }

    onCategoryChange(category: string) {
        this.slotsService.getSlotsByCategory(category).subscribe()
    }
}
