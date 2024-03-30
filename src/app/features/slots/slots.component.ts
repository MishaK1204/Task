import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core'
import { SlotCategoriesComponent } from '../../ui/slot-categories/slot-categories.component'
import { SlotProvidersComponent } from '../../ui/slot-providers/slot-providers.component'
import { SlotsService } from '../../shared/services/slots.service'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { Observable, of, switchMap } from 'rxjs'
import { SlotsByProviderI } from '../../shared/interfaces/slots-by-provider.interface'
import { GameI } from '../../shared/interfaces/game.interface'
import { SlotCardComponent } from '../../ui/slot-card/slot-card.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

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

            @if (slotsService.games()) {
                <ul class="app-slots__grid-container">
                    @for (game of slotsService.games(); track game.game_id) {
                        <li app-slot-card [game]="game"></li>
                    }
                </ul>
            }
        </section>
    `,
    imports: [
        SlotCategoriesComponent,
        SlotProvidersComponent,
        SlotCardComponent,
    ],
    styles: [
        `
            .app-slots__grid-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
                gap: 1.2rem;
                padding: 1.2rem;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotsComponent implements OnInit {
    public slotsService = inject(SlotsService)
    private route = inject(ActivatedRoute)
    private router = inject(Router)
    private destroyRef$ = inject(DestroyRef)

    category!: string
    provider!: string

    ngOnInit() {
        this.category = this.route.snapshot.queryParams['category']
        this.provider = this.route.snapshot.queryParams['provider']

        this.getSlots().subscribe()
        this.listenToRouterEvents()
    }

    getSlots(): Observable<SlotsByProviderI | GameI[]> {
        if (this.provider) {
            return this.slotsService.getSlotsByProvider(this.provider)
        } else {
            return this.slotsService.getSlotsByCategory(
                this.category || 'web:popular'
            )
        }
    }

    listenToRouterEvents() {
        this.router.events
            .pipe(
                switchMap((res) => {
                    if (res instanceof NavigationEnd && res.url === '/slots') {
                        return this.getSlots()
                    } else {
                        return of({})
                    }
                }),
                takeUntilDestroyed(this.destroyRef$)
            )
            .subscribe()
    }
}
