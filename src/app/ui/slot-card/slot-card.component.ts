import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { GameI } from '../../shared/interfaces/game.interface'
import { NgClass } from '@angular/common'

@Component({
    selector: 'li[app-slot-card]',
    standalone: true,
    template: `
        <div class="app-slot-card__content">
            <div class="app-slot-card__image">
                <div class="app-slot-card__button">
                    <button>PLAY</button>
                </div>
                <img [src]="game.image" alt="{{ game.name }}" />
            </div>
            <p class="app-slot-card__title">{{ game.name }}</p>
        </div>
    `,
    styleUrls: ['slot-card.component.scss'],
    imports: [NgClass],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.app-slot-card]': 'true',
    },
})
export class SlotCardComponent {
    @Input() game!: GameI
}
