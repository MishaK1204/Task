import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SlotCategoriesComponent } from '../../ui/slot-categories/slot-categories.component'
import { SlotProvidersComponent } from '../../ui/slot-providers/slot-providers.component'

@Component({
    selector: 'app-slots',
    standalone: true,
    template: `
        <section>
            <img src="assets/images/banner.svg" alt="Banner" />

            <nav>
                <app-slot-categories></app-slot-categories>

                <app-slot-providers></app-slot-providers>
            </nav>
        </section>
    `,
    imports: [SlotCategoriesComponent, SlotProvidersComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotsComponent {}
