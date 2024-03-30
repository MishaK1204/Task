import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NgClass } from '@angular/common'
import { SlotsService } from '../../shared/services/slots.service'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
    selector: 'app-slot-providers',
    standalone: true,
    template: `
        <ul class="app-slot-providers__providers-list">
            @for (provider of providers()?.data; track provider.provider) {
                <li
                    class="app-slot-providers__providers-list-item"
                    routerLinkActive="app-slot-providers__active-link"
                >
                    <a
                        (click)="onProviderChange(provider.provider)"
                        routerLink=""
                        [queryParams]="{
                            provider: provider.provider
                        }"
                        >{{ provider.name }}</a
                    >
                </li>
            }
        </ul>

        <button
            type="button"
            class="app-slot-providers__see-more-btn"
            (click)="slotProvidersExpanded = !slotProvidersExpanded"
        >
            See More
        </button>
    `,
    styleUrls: ['slot-providers.component.scss'],
    imports: [RouterLink, NgClass, RouterLinkActive],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.app-slot-providers]': 'true',
        '[class.expanded]': 'slotProvidersExpanded',
    },
})
export class SlotProvidersComponent {
    private slotsService: SlotsService = inject(SlotsService)

    providers = toSignal(this.slotsService.getProviders())
    slotProvidersExpanded = false

    onProviderChange(category: string) {
        this.slotsService.getSlotsByProvider(category).subscribe()
    }
}
