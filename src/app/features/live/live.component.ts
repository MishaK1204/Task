import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-live',
    standalone: true,
    template: `<h1>Live component</h1>`,
    imports: [],
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveComponent {}
