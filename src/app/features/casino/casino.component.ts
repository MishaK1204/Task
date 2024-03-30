import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-casino',
    standalone: true,
    template: `<h1>Casino component</h1>`,
    imports: [],
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasinoComponent {}
