import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-sport',
    standalone: true,
    template: `<h1>Sport component</h1>`,
    imports: [],
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportComponent {}
